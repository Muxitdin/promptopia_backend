import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import promptRoutes from "./routes/promptRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"

const app = express();

const allowedOrigins = ['https://prompthub-96ry.onrender.com'];

if (app.get('env') !== 'production') {
    app.use(cors());
};
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});
app.use(express.json());
dotenv.config();

app.use(express.static("uploads"));

app.use("/api/prompts", promptRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload-image", imageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

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