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
            throw new Error('Pogreška prilikom provjere identiteta, pokušajte ponovno')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Morate se prijaviti')
    }
})

export const admin = (req, res, next) => {
    if (req.user && req.user.role === ROLE_ADMIN) return next()

    res.status(401)
    throw new Error('Morate biti prijavljeni kao admin')
}

export const teacher = (req, res, next) => {
    if (req.user && req.user.role === ROLE_TEACHER) return next()

    res.status(401)
    throw new Error('Morate biti prijavljeni kao profesor')
}

export const student = (req, res, next) => {
    if (req.user && req.user.role === ROLE_STUDENT) return next()

    res.status(401)
    throw new Error('Morate biti prijavljeni kao student')
}

// To use this middleware request parameter must be :courseId
export const enrolled = asyncHandler(async (req, res, next) => {
    if (!req.params.courseId) throw new Error('Nepravilan zahtjev, ID kolegija mora biti zadan')

    const userEnrolled = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: req.user.id, courseId: req.params.courseId } }
    })

    if (!userEnrolled && req.user.role !== ROLE_ADMIN) {
        res.status(401)
        throw new Error('Niste upisani u odabrani kolegij')
    }

    if ((req.user && req.user.role === ROLE_ADMIN) || userEnrolled) {
        return next()
    }

    res.status(401)
    throw new Error('Samo upisani studenti i profesori mogu ovdje pristupiti')
})
