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

    if (contains(err.message, 'invalid', { ignoreCase: true })) {
        statusCode = 400
    } else if (err.name === 'NotFoundError') {
        statusCode = 404
    }

    let message = err.message
    if (err.name === 'TypeError') message = 'Something went wrong'
    if (err.code === PRISMA_NOT_FOUND) message = 'Requested data cannot be found'
    if (err.code === PRISMA_UNIQUE_PRIMARY_KEY_FAILED)
        message = 'There is already record with provided data'
    if (err.code === PRISMA_FOREIGN_KEY_FAILED) message = 'There is problem with related data'

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
