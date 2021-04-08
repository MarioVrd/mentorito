import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, firstName: true, lastName: true, email: true, role: true }
            })

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
