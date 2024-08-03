import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'File upload failed' });
    }

    const baseUrl = 'https://promptopia-back.onrender.com'
        
    res.json({
        imgUrl: `${baseUrl}/${req.file.filename}`,
    }).status(200);
})

// router.get("/files/:filename", async (req, res) => {
//     const conn = mongoose.connection;
//     const bucket = new GridFSBucket(conn.db, {
//         bucketName: 'uploads',
//     });

//     const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

//     downloadStream.on('data', (chunk) => {
//         res.write(chunk);
//     });

//     downloadStream.on('error', () => {
//         res.sendStatus(404);
//     });

//     downloadStream.on('end', () => {
//         res.end();
//     });
// });

export default router;