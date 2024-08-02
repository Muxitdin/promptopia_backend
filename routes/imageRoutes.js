import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
    console.log(req.file);
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://promptopia-back.onrender.com/'
        : 'http://localhost:5000/'
        
    res.json({
        imgUrl: `${baseUrl}${req.file.filename}`,
    }).status(200);
})

export default router;