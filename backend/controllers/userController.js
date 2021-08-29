import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'
import isEmail from 'validator/lib/isEmail.js'
import isIn from 'validator/lib/isIn.js'
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import { encrypt, comparePassword, generateToken } from '../utils/authUtils.js'
import { availableRoles, ROLE_STUDENT } from '../constants/roles.js'
import { pwdConfig } from '../constants/passwordConfig.js'

// @desc    Create a new user
// @route   POST /api/users/register
// @access  Admin
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body

    if (!firstName || !lastName || !email || !password || !role) {
        res.status(400)
        throw new Error('Nepravilan zahtjev! Ime, prezime, email, lozinka i uloga su obavezni!')
    }

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

    if (!isStrongPassword(password, pwdConfig))
        throw new Error(
            `Nepravilan zahtjev! Lozinka mora imati barem ${pwdConfig.minLength} znakova od kojih barem ${pwdConfig.minLowercase} malo, ${pwdConfig.minUppercase} veliko slovo i ${pwdConfig.minNumbers} broj`
        )

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

    if (!email || !password) {
        res.status(400)
        throw new Error('Nepravilan zahtjev! Email i lozinka su obavezni.')
    }

    const user = await prisma.user.findUnique({
        where: { email },
        include: { notifications: true }
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

// @desc    Update my account
// @route   PUT /api/users/me
// @access  Private
export const updateMyAccount = asyncHandler(async (req, res) => {
    const { firstName, lastName, oldPassword, newPassword } = req.body

    if (!firstName || !lastName || !oldPassword) {
        res.status(400)
        throw new Error('Nepravilan zahtjev! Ime, prezime i trenutna lozinka su obavezni.')
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    let validOldPassword = false

    validOldPassword = await comparePassword(oldPassword, user.password)
    if (!validOldPassword) throw new Error('Nepravilna trenutna lozinka')

    const newData = { firstName, lastName }

    if (newPassword) {
        if (!isStrongPassword(newPassword, pwdConfig))
            throw new Error(
                `Nepravilan zahtjev! Lozinka mora imati barem ${pwdConfig.minLength} znakova od kojih barem ${pwdConfig.minLowercase} malo, ${pwdConfig.minUppercase} veliko slovo i ${pwdConfig.minNumbers} broj`
            )

        const encryptedPassword = await encrypt(newPassword)
        newData.password = encryptedPassword
    }

    const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: newData,
        select: { id: true, email: true, firstName: true, lastName: true }
    })

    res.json(updatedUser)
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
    const notifications = await prisma.notification.findMany({
        where: { AND: [{ userId: req.user.id }, { seen: false }] },
        orderBy: { createdAt: 'desc' }
    })

    res.json(notifications)
})

// @desc    Set notification as seen
// @route   PUT /api/users/notifications/:notificationId
// @access  Private
export const markNotificationAsSeen = asyncHandler(async (req, res) => {
    const { notificationId } = req.params

    const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { seen: true }
    })

    res.json(notification)
})
