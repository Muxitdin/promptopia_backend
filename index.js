import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import promptRoutes from "./routes/promptRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"

const app = express();

// const allowedOrigins = ['https://prompthub-96ry.onrender.com'];

// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
// }));
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