import multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from "dotenv";
dotenv.config();

// // Multer configuration
// const storage = multer.diskStorage({
//     // destination: function (req, file, cb) {
//     //     cb(null, 'uploads/')
//     // }
//     destination: "./uploads",
//     filename: (_, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        console.log("file info: " + { file })
        return {
            bucketName: 'uploads', // The bucket name in MongoDB
            filename: `${Date.now()}-${file.file.originalname}`,
        };
    },
});
const upload = multer({ storage });

// const upload = new multer({ storage: storage });

export default upload;