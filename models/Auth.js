import mongoose from "mongoose";

const Auth = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    },
);

export default mongoose.model("Auth", Auth);