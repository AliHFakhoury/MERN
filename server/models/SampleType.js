// for the cloud
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const SampleTypeSchema = new mongoose.Schema(
    {
        sampleTypeName: String,
        description: String,
        fields: Array,
        project_id: ObjectId
    }
);

const SampleType = mongoose.model('SampleType', SampleTypeSchema);

export default SampleType