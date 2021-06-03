import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'
import isEmail from 'validator/lib/isEmail.js'
import isIn from 'validator/lib/isIn.js'
import { encrypt, comparePassword, generateToken } from '../utils/authUtils.js'
import { availableRoles, ROLE_STUDENT } from '../constants/roles.js'

// @desc    Create a new user
// @route   POST /api/users/register
// @access  Admin
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
        res.status(409)
        throw new Error(`Korisnik sa emailom ${email} već postoji`)
    }

    if (!isIn(role, availableRoles))
        throw new Error(
            `Nepravilan zahtjev! Uloga mora biti jedna od sljedećih: ${availableRoles.join(', ')}`
        )

    if (!isEmail(email)) throw new Error('Nepravilan email')

    const encryptedPassword = await encrypt(password)

    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            role: role ?? ROLE_STUDENT
        },
        select: { id: true }
    })

    res.status(201).json(newUser)
})

// @desc    User login
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: { email: email },
        include: { notifications: { include: { notification: true } } }
    })

    if (!user) throw new Error('Nepravilni podaci za prijavu')

    const correctPassword = await comparePassword(password, user.password)

    if (!correctPassword) throw new Error('Nepravilni podaci za prijavu')

    const { id, firstName, lastName, role, notifications } = user

    res.json({
        id,
        firstName,
        lastName,
        email,
        role,
        notifications,
        token: generateToken({ id, role })
    })
})

// @desc    Fetch all users or the ones selected by role in query
// @route   GET /api/users
// @access  Admin/Teacher
export const getUserList = asyncHandler(async (req, res) => {
    if (req.user.role === ROLE_STUDENT) {
        res.status(401)
        throw new Error('Nemate dopuštenje za pristup')
    }

    const { role } = req.query

    // fetch all users if role is not set or is invalid
    const queryArgs = { include: { coursesEnrolled: true } }

    // if role is set and is valid, filter by role
    if (role && isIn(role.toUpperCase(), availableRoles)) {
        queryArgs.where = { role: role.toUpperCase() }
    }

    const users = await prisma.user.findMany(queryArgs)
    res.json(users)
})

// @desc    Fetch notifications that are not seen
// @route   GET /api/users/notifications
// @access  Private
export const getUserNotifications = asyncHandler(async (req, res) => {
    const notifications = await prisma.userNotification.findMany({
        where: { AND: [{ userId: req.user.id }, { seen: false }] },
        include: { notification: true },
        orderBy: { createdAt: 'desc' }
    })

    res.json(notifications)
})

// @desc    Set notification as seen
// @route   PUT /api/users/notifications/:notificationId
// @access  Private
export const markNotificationAsSeen = asyncHandler(async (req, res) => {
    const { notificationId } = req.params

    const notification = await prisma.userNotification.update({
        where: { userId_notificationId: { userId: req.user.id, notificationId } },
        data: { seen: true }
    })

    res.json(notification)
})
