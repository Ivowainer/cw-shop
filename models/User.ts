import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: "{VALUE} thats role isn't valid",
            default: 'client',
            required: true
        }
    }
}, {
    timestamps: true,
})

const User:Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema)

export default User;