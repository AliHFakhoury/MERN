import express from 'express'
import { getAllProjects, createProject, updateProject, addSampleTypeId, removeSampleTypeId, getProject, getProjectSampleTypes, uploadProjectDocuments } from '../controllers/projectController.js'

const router = express.Router()

router.route('/getAllProjects').post(getAllProjects)
router.route('/uploadDocuments/:project_id').post(uploadProjectDocuments)
router.route('/getProject/:project_id').get(getProject)
router.route('/getProjectSampleTypes/:project_id').get(getProjectSampleTypes)
router.route('/createProject').post(createProject)
router.route('/updateProject/:project_id').put(updateProject)
router.route('/addSampleTypeId').put(addSampleTypeId)
router.route('/removeSampleTypeId').put(removeSampleTypeId)


export default router