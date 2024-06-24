import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import promptRoutes from "./routes/promptRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/prompts", promptRoutes);
app.use("/api/auth", authRoutes);

const RunCode = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        });
    } catch (error) {
        console.log(error)
    }
}
RunCode();