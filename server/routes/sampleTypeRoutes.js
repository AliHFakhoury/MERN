import express from 'express'
import { getAllSampleTypes, updateSampleTypeField, addSampleTypeField, createSampleType, deleteSampleType, updateSampleType, updateSampleTypeOnEdit, getAllSampleTypesForProject, getSampleTypesWithLatestSamples, getSampleTypesWithSamples } from '../controllers/sampleTypeController.js'

const router = express.Router()

router.route('/getAllSamples/:sampleTypeId').get(getSampleTypesWithSamples)
router.route('/getAllSamplesWithLatest').post(getSampleTypesWithLatestSamples)
router.route('/getAllSampleTypes').get(getAllSampleTypes)
router.route('/getAllSampleTypesForProject').post(getAllSampleTypesForProject)
router.route('/updateSampleType/updateField/:sampleTypeId/:fieldIndex').put(updateSampleTypeField)
router.route('/updateSampleType/addField/:sampleTypeId').put(addSampleTypeField)
router.route('/addSampleType').post(createSampleType)
router.route('/deleteSampleType/:sampleTypeId').delete(deleteSampleType)
router.route('/updateSampleType/:sampleTypeId').put(updateSampleType)
router.route('/updateSampleType/onEdit/:sampleTypeId').put(updateSampleTypeOnEdit)

export default router