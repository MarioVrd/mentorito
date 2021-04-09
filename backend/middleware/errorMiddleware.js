import contains from 'validator/lib/contains.js'
import { PRISMA_NOT_FOUND } from '../constants/prismaErrors.js'

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

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
