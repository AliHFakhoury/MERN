import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'username'
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },

    company_id: ObjectId
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET , {expiresIn:  process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema);