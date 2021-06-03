import path from 'path'
import asyncHandler from 'express-async-handler'
import { ROLE_STUDENT } from '../constants/roles.js'
import prisma from '../prisma/client.js'

export const getFileById = asyncHandler(async (req, res) => {
    const { uploadId } = req.params

    const upload = await prisma.upload.findUnique({
        where: { id: uploadId },
        select: { title: true, userId: true }
    })

    if (!upload) {
        res.status(404)
        throw new Error('Nije pronađena odabrana datoteka')
    }

    const { title: fileName, userId } = upload

    if (req.user.role === ROLE_STUDENT && userId !== req.user.id) {
        res.status(401)
        throw new Error('Nemate dopuštenje za preuzimanje ove datoteke')
    }

    const __dirname = path.resolve()
    res.sendFile(path.join(__dirname, './uploads', fileName))
})

export const createUpload = asyncHandler(async (req, res) => {
    const upload = await prisma.upload.create({
        data: { title: req.file.filename, type: req.file.mimetype, userId: req.user.id }
    })
    // res.send(req.file.filename)
    res.status(201).json(upload)
})
