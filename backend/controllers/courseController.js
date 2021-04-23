import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'
import validator from 'validator'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
    const courses = await prisma.course.findMany({
        include: { studentsEnrolled: true }
    })

    res.json(courses)
})

// @desc    Fetch course by id
// @route   GET /api/courses/:id
// @access  Private
export const getCourseById = asyncHandler(async (req, res) => {
    const course = await prisma.course.findUnique({
        where: { id: req.params.id },
        include: {
            studentsEnrolled: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true
                        }
                    }
                }
            },
            exercises: true,
            news: true
        },
        rejectOnNotFound: true
    })

    course.studentsEnrolled.forEach(student => {
        student.userId
    })

    res.json(course)
})

// @desc    Create a course
// @route   POST /api/courses
// @access  Admin
export const createCourse = asyncHandler(async (req, res) => {
    let { title, description, locked } = req.body

    if (typeof locked === 'string') validator.toBoolean(locked)

    const course = await prisma.course.create({ data: { title, description, locked } })

    res.json(course)
})

// @desc    Update the course
// @route   PUT /api/courses/:id
// @access  Admin
export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params
    let { title, description, locked } = req.body

    if (typeof locked === 'string') validator.toBoolean(locked)

    const updatedCourse = await prisma.course.update({
        where: { id },
        data: { title, description, locked }
    })

    res.json(updatedCourse)
})

// @desc    Delete the course
// @route   DELETE /api/courses/:id
// @access  Admin
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const deletedCourse = await prisma.course.delete({ where: { id } })

        res.json({ message: `Successfully deleted ${deletedCourse.title} course` })
    } catch (error) {
        let message = error.message

        if (error.code === 'P2014')
            message = 'There are still enrolled students, unenroll everyone and then delete'

        res.status(400).json({ message })
    }
})

// @desc    Fetch all enrolled courses for logged in user
// @route   GET /api/courses/enrolled
// @access  Private
export const getEnrolledCourses = asyncHandler(async (req, res) => {
    const enrolledCourses = await prisma.enrollment.findMany({
        where: { userId: req.user.id },
        include: { course: true }
    })

    res.json(enrolledCourses)
})

// @desc    Enroll logged in or specified userId to selected courseId
// @route   POST /api/courses/enroll
// @access  Student/Teacher/Admin
export const enrollToCourse = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) throw new Error('Invalid course id')

    if (course.locked && req.user.role === ROLE_STUDENT) throw new Error('Course is locked')

    // If userId is specified in req.body enroll specified user (for teacher or admin)
    // If the userId is NOT specified, enroll logged in user
    const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: userId || req.user.id, courseId } }
    })
    if (enrollment) {
        res.status(400)
        throw new Error('Already enrolled in this course')
    }

    await prisma.enrollment.create({
        data: { courseId, userId: userId || req.user.id }
    })

    res.json({ message: `Successfully enrolled to ${course.title} course` })
})
