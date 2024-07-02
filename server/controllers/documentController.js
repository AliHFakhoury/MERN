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

const readAllDocumentsInProject = async (req, res) => {
    const project_id = req.params.project_id

    const params = {
        Bucket: process.env.S3_BUCKET,
        Prefix: 'projects/'+project_id+'/documents/'
    };

    const filesArray = []
    
    s3.listObjectsV2(params, function (err, data) {
        if(err){
            res.send(err)
        }else{
            data.Contents.forEach( function (obj, index) {
                let key = obj.Key
                let keySplit = key.split("/")
                let fileName = keySplit[keySplit.length-1]
                let size = obj.Size

                let fileObj = {
                    fileName: fileName,
                    fileSize: (size/(1024*1024)).toFixed(3)
                }

                filesArray.push(fileObj)
            })

            res.send(filesArray)
        }
    })

}
        
export { readAllDocumentsInProject }