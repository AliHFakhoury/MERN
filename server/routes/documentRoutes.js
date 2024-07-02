import express from 'express'
import { readAllDocumentsInProject } from '../controllers/documentController.js'

const router = express.Router()

// router.route('/getAllDocuments').get(readAllDocumentsInProject)
router.route('/getAllDocuments/:project_id').get(readAllDocumentsInProject)

export default router
