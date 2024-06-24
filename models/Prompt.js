import mongoose from "mongoose";

const Prompts = new mongoose.Schema(
    {
        content: { type: String, required: true },
        tag: { type: String, required: true },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'Auth',
            required: true
        }
    },
    {
        timestamps: true
    })

export default mongoose.model("Prompts", Prompts);