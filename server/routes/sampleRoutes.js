import express from "express";
import { getAllSamples, addSample, getLatestSamples, getLatestSamplesMultipleSTs, uploadFile } from "../controllers/sampleController.js";

const router = express.Router()

router.route('/upload/:projectID/:ST_ID/:sampleID/:fieldName').post(uploadFile)
router.route('/getAllSamples/:ST_ID').get(getAllSamples)
router.route('/addSample/:projectID/:ST_ID').put(addSample)
router.route('/getLatestSamples/:ST_ID').get(getLatestSamples)
router.route('/getLatestSamplesMultiple').post(getLatestSamplesMultipleSTs)


export default router