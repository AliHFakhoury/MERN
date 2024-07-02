import SampleType from "../models/SampleType.js" 
import Project from "../models/Project.js"
import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb";

import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'

const getSampleTypesWithSamples = async (req, res) => {
    const sampleTypeId = req.params.sampleTypeId
 
    SampleType.aggregate([
        {
            $match: {
                _id: new ObjectId(sampleTypeId)
            }
        },
        {
            $lookup: {
                from: 'samples',
                localField: '_id',
                foreignField: 'sampleTypeId',
                as: 'ST_Samples',
            }
        }
    ]).then( (result) => {
        console.log(result)
        res.send(result)
    })
}

const getSampleTypesWithLatestSamples = async (req, res) => {
    const sampleTypeIds = req.body
    const updatedSampleTypeIds = sampleTypeIds.map ( (id) => new ObjectId(id) )
    
    SampleType.aggregate([
        {
            $match: {
                _id: { $in: updatedSampleTypeIds}
            }
        },
        {
            $lookup: {
                from: 'samples',
                localField: '_id',
                foreignField: 'sampleTypeId',
                pipeline: [
                    {
                        $sort: { _id: -1}
                    }
                ],
                as: 'ST_Samples',
            }
        },
        {
            $addFields: {
                ST_Samples: { $slice: ["$ST_Samples", 5]}
            }
        }
    ]).then( (result) => {
        res.send(result)
    })
}

const getAllSampleTypesForProject = async (req, res) => {
    const sampleTypeIds = req.body;    
    const sampleTypeIdsObjects = [];

    sampleTypeIds.forEach((ST_ID) => {
        const ST_ID_Object = new ObjectId(ST_ID)
        sampleTypeIdsObjects.push(ST_ID_Object)
    });

    console.log(sampleTypeIdsObjects)

    
    SampleType.find({ _id: {$in: sampleTypeIdsObjects }}, (err, documents) => {
        if (err) {
            console.error('Error querying MongoDB:', err);
            res.send(err)
        } else {
            console.log('Documents:', documents);
            res.send(documents)
        }
    })
}

const getAllSampleTypes = async (req, res) => {
    const sampleTypes = await SampleType.find()

    res.status(StatusCodes.OK).json(sampleTypes);
}

const updateSampleTypeField = async (req, res) => {
    const sampleTypeId = req.params.sampleTypeId
    const fieldIndex = req.params.fieldIndex
    const updatedFields = req.body

    console.log("Sample Type Id: " + sampleTypeId)
    console.log("Field Index: " + fieldIndex)
    console.log("Request body: ")
    console.log(updatedFields)

    const updateQuery = {
        $set: {
            [`fields.${fieldIndex}.values`]: updatedFields
        }
    }

    SampleType.updateOne(
        { _id: sampleTypeId },
        updateQuery
    ).then( (result) => {
        console.log(result)
    })

    res.send("Response")
}

const addSampleTypeField = async (req, res) => {
    const sampleTypeId = req.params.sampleTypeId
    const updatedFields = req.body

    console.log("Sample Type Id: " + sampleTypeId)
    console.log("Request body: ")
    console.log(updatedFields)

    const updateQuery = {
        $set: {
            [`fields`]: updatedFields
        }
    }

    SampleType.updateOne(
        { _id: sampleTypeId },
        updateQuery
    ).then( (result) => {
        console.log(result)
    })

    res.send("Response")
}

const createSampleType = async (req, res) => {
    const fieldData = req.body
    const ST_name = fieldData.sampleTypeName
    const descriptionVar = fieldData.description
    const projectID = fieldData.project_id

    const project_id_Object = new ObjectId(projectID)
    
    const sample_type = {
        sampleTypeName: ST_name,
        description: descriptionVar,
        fields: [],
        project_id: project_id_Object
    }

    console.log(sample_type)
    
    SampleType.create(sample_type).then( (result) => {
        console.log("Sample Type Created")
        sample_type.sampleTypeID = result._id

        Project.updateOne(
            { _id: projectID},
            { $push: { sample_type_ids: result._id } }
        ).then(() => {
            res.send(sample_type)
        })
    })
}

const deleteSampleType = async (req, res) => {
    const ST_ID = req.params.sampleTypeId
    console.log(ST_ID)

    SampleType.deleteOne({
        _id: ST_ID
    }).then((result) => { console.log(result)})

    res.send("Deleted :D")
}

const updateSampleType = async (req, res) => {
    const sampleTypeId = req.params.sampleTypeId
    const formData = req.body
   
    console.log(sampleTypeId)
    console.log(formData)

    SampleType.updateOne(
        { _id: sampleTypeId },
        { fields: formData }
    ).then( (result) => {
        console.log(result)
    })

    res.send("Response")
}

const updateSampleTypeOnEdit = async (req, res) => {
    const sampleTypeId = req.params.sampleTypeId
    const formData = req.body
   
    console.log(sampleTypeId)
    console.log(formData)

    SampleType.updateOne(
        { _id: sampleTypeId },
        formData
    ).then( (result) => {
        console.log(result)
    })

    res.send("Response")
}

export { getAllSampleTypes, updateSampleTypeField, addSampleTypeField, createSampleType,
         deleteSampleType, updateSampleType, updateSampleTypeOnEdit, getAllSampleTypesForProject,
         getSampleTypesWithLatestSamples, getSampleTypesWithSamples }