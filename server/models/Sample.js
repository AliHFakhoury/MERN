// for the cloud
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const SampleSchema = new mongoose.Schema(
    {
        projectId: ObjectId,
        sampleTypeId: ObjectId,
        data: Object
    }
);

const Sample = mongoose.model('Sample', SampleSchema);

export default Sample