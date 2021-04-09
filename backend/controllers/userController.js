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
        throw new Error('User already exists')
    }

    if (!isIn(role, availableRoles)) throw new Error('Invalid role selected for new user')

    if (!isEmail(email)) throw new Error('Invalid email')

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

    const user = await prisma.user.findUnique({ where: { email: email }, rejectOnNotFound: true })

    const correctPassword = await comparePassword(password, user.password)

    if (!correctPassword) throw new Error('Invalid credentials! Please try again.')

    res.json({ id: user.id, email, token: generateToken({ id: user.id, role: user.role }) })
})
