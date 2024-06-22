import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    eye_color: {
        type: String,
        required: true,
    },
    hair_color: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Result || mongoose.model("Result", resultSchema);