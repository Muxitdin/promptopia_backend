import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ message: 'File upload failed' });
        }

        res.json({
            imgUrl: `https://promptopia-back.onrender.com/${req.file.filename}`,
        }).status(200);
    } catch (error) {
        console.log(error);
    }
})

export default router;