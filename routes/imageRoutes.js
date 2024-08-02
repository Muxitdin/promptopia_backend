import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.json({
        imgUrl: `https://prompthub-96ry.onrender.com/${req.file.filename}`,
    }).status(200);
})

export default router;