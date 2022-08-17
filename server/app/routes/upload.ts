import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { uploadImage } from "../controllers/upload.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb(new Error('Give proper files formate to upload'))
    }
});

const router = Router();

// Create a new picture
router.post("/", upload.single('picture'), uploadImage);

export default router;