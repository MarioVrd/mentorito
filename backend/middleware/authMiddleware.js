import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles.js'

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

export const admin = (req, res, next) => {
    if (req.user && req.user.role === ROLE_ADMIN) return next()

    res.status(401)
    throw new Error('Not authorized as an admin')
}

export const teacher = (req, res, next) => {
    if (req.user && req.user.role === ROLE_TEACHER) return next()

    res.status(401)
    throw new Error('Not authorized as teacher')
}

export const student = (req, res, next) => {
    if (req.user && req.user.role === ROLE_STUDENT) return next()

    res.status(401)
    throw new Error('Not authorized as student')
}

// To use this middleware request parameter must be :courseId
export const enrolled = asyncHandler(async (req, res, next) => {
    if (!req.params.courseId) throw new Error('Invalid request, course id must be specified in URL')

    const userEnrolled = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: req.user.id, courseId: req.params.courseId } },
        rejectOnNotFound: true
    })

    if ((req.user && req.user.role === ROLE_ADMIN) || userEnrolled) {
        return next()
    }

    res.status(401)
    throw new Error('Only enrolled students and teachers can access this')
})
