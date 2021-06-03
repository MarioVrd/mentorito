import contains from 'validator/lib/contains.js'
import {
    PRISMA_FOREIGN_KEY_FAILED,
    PRISMA_UNIQUE_PRIMARY_KEY_FAILED,
    PRISMA_NOT_FOUND
} from '../constants/prismaErrors.js'

export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode

    if (contains(err.message, 'nepravil', { ignoreCase: true })) {
        statusCode = 400
    } else if (err.name === 'NotFoundError') {
        statusCode = 404
    }

    let message = err.message
    if (err.name === 'TypeError') message = 'Došlo je do pogreške'
    if (err.code === PRISMA_NOT_FOUND) message = 'Nije moguće dohvatiti tražene povezane podatke'
    if (err.code === PRISMA_UNIQUE_PRIMARY_KEY_FAILED)
        message = 'Već postoji zapis sa istim podacima'
    if (err.code === PRISMA_FOREIGN_KEY_FAILED)
        message = 'Došlo je do pogreške sa povezanim podacima'

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
