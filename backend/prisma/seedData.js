import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles.js'
import { encrypt } from '../utils/authUtils.js'

const password = await encrypt(process.env.DEFAULT_USER_PASSWORD || '123456')

export const users = [
    {
        firstName: 'admin',
        lastName: 'mentorito',
        email: 'admin@gmail.com',
        password,
        role: ROLE_ADMIN
    },
    {
        firstName: 'student',
        lastName: 'mentorito',
        email: 'student@gmail.com',
        password
    },
    {
        firstName: 'teacher',
        lastName: 'mentorito',
        email: 'teacher@gmail.com',
        password,
        role: ROLE_TEACHER
    }
]

export const courses = [
    {
        title: 'Programming Basics'
    },
    {
        title: 'Web Programming',
        locked: true
    }
]
