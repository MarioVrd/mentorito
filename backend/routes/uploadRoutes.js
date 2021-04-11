import { Router } from 'express'
import path from 'path'
import multer from 'multer'

const router = Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|pdf|zip|rar|docx|doc|pptx|ppt|xlsx|xls|accdb/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(
            'File can only be of type: jpg, jpeg, png, pdf, zip, rar, docx, doc, pptx, ppt, xlsx, xls or accdb'
        )
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('file'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router
