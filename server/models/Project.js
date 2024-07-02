import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

let Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        project_name: String,
        project_type: String,
        company: ObjectId,
        creator: ObjectId,
        sample_type_ids: Array
    }
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project
