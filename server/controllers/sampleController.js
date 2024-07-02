import { ObjectId } from "mongodb";
import Sample from "../models/Sample.js";
import AWS from "aws-sdk"
import { S3 } from "@aws-sdk/client-s3";
import multer from "multer";
import s3Storage from "multer-s3";

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new S3()

const uploadFile = async (req, res) => {
    const projectID = req.params.projectID;
    const ST_ID = req.params.ST_ID;
    const sampleID = req.params.sampleID;
    const fieldName = req.params.fieldName;
    
    const upload = multer({
        storage: s3Storage({
            s3: s3,
            bucket: process.env.S3_BUCKET,
            key: function (req, file, cb){
                cb(null, `projects/${projectID}/sampleTypes/${ST_ID}/${sampleID}/${fieldName}/` + file.originalname);
            }
        })
    }).array('files', 10)
    //limits to 10

    
    upload(req, res, (err) => {
        if (err) {
            // Handle upload error
            console.error(err);
            return res.status(500).json({ error: 'Failed to upload file' });
        }
    
        // File uploaded successfully
        return res.status(200).json({ message: 'File uploaded successfully' });
    });

}



const getAllSamples = async (req, res) => {
    const ST_ID = req.params.ST_ID;

    const samples = await Sample.find({sampleTypeId: ST_ID})

    res.send(samples)
}

const addSample = async (req, res) => {

    
    const projectID = req.params.projectID
    const ST_ID = req.params.ST_ID

    const data = req.body

    const sampleObj = {
        projectId: projectID,
        sampleTypeId: ST_ID,
        data: data
    }

    console.log(data)
    // uploadFile()

    Sample.create(sampleObj).then( (result) => {
        res.send(result)
    })

}

const getLatestSamples = async (req, res) => {
    const ST_ID = req.params.ST_ID
    const latestSamples = await Sample.find({sampleTypeId: ST_ID}).sort({_id:-1}).limit(5)
    res.send(latestSamples)
}

const getLatestSamplesMultipleSTs = async (req, res) => {
    const ST_IDs = req.body
    const objectIds = ST_IDs.map(id => new ObjectId(id));
    
    Sample.aggregate([
        { 
            $match: { sampleTypeId: { $in: objectIds }}
        },
        {
            $sort: { sampleTypeId: 1, _id: -1 }
        },
        {
            $group: {
                _id: "$sampleTypeId",
                samples: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                sampleTypeId: "$_id",
                samples: {$slice: ["$samples", 5]}
            }
        }
    ]).then( (result) => {
        
        const resultMap = {}
        console.log(result)

        result.forEach(sampleGroup => {
            resultMap[sampleGroup.sampleTypeId] = sampleGroup.samples
        })
        
        res.send(resultMap)
    })




}

export { getAllSamples, addSample, getLatestSamples, getLatestSamplesMultipleSTs, uploadFile }