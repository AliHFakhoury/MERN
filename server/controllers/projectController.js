import { ObjectId } from "mongodb";
import Project from "../models/Project.js"
import SampleType from "../models/SampleType.js"
import { StatusCodes } from "http-status-codes"

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

const uploadProjectDocuments = async (req, res) => {
    const projectID = req.params.project_id;
    
    const upload = multer({
        storage: s3Storage({
            s3: s3,
            bucket: process.env.S3_BUCKET,
            key: function (req, file, cb){
                cb(null, `projects/${projectID}/documents/` + file.originalname);
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



const getAllProjects = async (req, res) => {
    const userID = req.body.userID;
    const objectUserID = new ObjectId(userID)

    const projects = await Project.find({creator: objectUserID});
    
    res.status(StatusCodes.OK).json(projects);
}

const createProject = async (req, res) => {
    const formData = req.body
    
    console.log(formData)

    const project_name = formData.project_name
    const project_type = formData.project_type
    const project_creator = formData.project_creator
    const company_id = formData.company_id
    
    const company_id_Object = new ObjectId(company_id)
    const project_creator_object = new ObjectId(project_creator)

    const project = {
        project_name: project_name,
        project_type: project_type,
        company: company_id_Object,
        creator: project_creator_object
    }

    Project.create(project).then( (result) => {
        res.send(result)
    })

}

const updateProject = async (req, res) => {
    const formData = req.body;
    const project_id = req.params.project_id;

    const project_name = formData.project_name
    const project_type = formData.project_type

    const project_id_Object = new ObjectId(project_id)

    Project.updateOne(
        { _id: project_id_Object},
        { project_name: project_name, project_type: project_type }
    ).then( (result) => {
        res.send(result);
    })
}

const addSampleTypeId = async (req, res) => {
    const reqData = req.body;

    const project_id = reqData.project_id;
    const sampleTypeId = reqData.sampleTypeId;

    const project_id_Object = new ObjectId(project_id)

    Project.updateOne(
        { _id: project_id_Object},
        { $push: { sample_type_ids: sampleTypeId } }
    ).then( (result) => {
        res.send(result);
    })
}

const removeSampleTypeId = async (req, res) => {
    const reqData = req.body;

    const project_id = reqData.project_id;
    const sampleTypeId = reqData.sampleTypeId;

    const project_id_Object = new ObjectId(project_id)

    Project.updateOne(
        { _id: project_id_Object},
        { $pull: { sample_type_ids: sampleTypeId } }
    ).then( (result) => {
        res.send(result);
    })
}

const getProject = async(req, res) => {
    const project_id = req.params.project_id;
    
    const project_id_Object = new ObjectId(project_id)

    Project.findOne(
        { _id:project_id_Object }
    ).then( (result) => {
        console.log(result)
        console.log(project_id_Object)
        res.send(result);
    })
    
}

const getProjectSampleTypes = async(req, res) => {
    const project_id = req.params.project_id;

    const project_id_Object = new ObjectId(project_id)
    console.log(project_id)
    Project.findOne(
        { _id:project_id_Object }
    ).then( (result) => {
        const sampleTypesIds = result.sample_type_ids
        
        SampleType.find({_id: {$in: sampleTypesIds}}, (err, documents) => {
            if (err) {
                console.error('Error querying MongoDB:', err);
            } else {
                console.log('Documents:', documents);
                res.send(documents)
            }
        })
        
    })
    
}

export { getAllProjects, createProject, updateProject, addSampleTypeId, removeSampleTypeId, getProject, getProjectSampleTypes, uploadProjectDocuments }