import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import { protect } from '../middleware/authMiddleware.js'
import { getFileById, createUpload } from '../controllers/uploadController.js'

const router = Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}_${file.originalname}`)
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|pdf|zip|rar|txt|docx|doc|pptx|ppt|xlsx|xls|accdb/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(
            'File can only be of type: jpg, jpeg, png, pdf, zip, rar, txt, docx, doc, pptx, ppt, xlsx, xls or accdb'
        )
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

router.get('/:uploadId', protect, getFileById)
router.post('/', protect, upload.single('file'), createUpload)

export default router
