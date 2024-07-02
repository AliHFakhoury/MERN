// For V1


import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

let Schema = mongoose.Schema;

const DocumentSchema = new Schema(
    {
        document_name: String,
        document_type: String,
        project_id: ObjectId,
        creator: ObjectId
    }
);

const Document = mongoose.model('Document', DocumentSchema);

export default Document
