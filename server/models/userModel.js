import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    accessToken: {
        type: String
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

export default mongoose.model("authUser", authSchema);