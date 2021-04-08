import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'

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
    const course = await prisma.course.findFirst({
        where: { id: req.params.id },
        rejectOnNotFound: true
    })

    res.json(course)
})

// @desc    Enroll to course with id
// @route   POST /api/courses/enroll/:id
// @access  Private
export const enrollToCourse = asyncHandler(async (req, res) => {
    const { id } = req.params

    const course = await prisma.course.findUnique({ where: { id } })
    if (!course) throw new Error('Invalid course id')

    const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: req.user.id, courseId: id } }
    })
    if (enrollment) {
        res.status(400)
        throw new Error('You are already enrolled in this course')
    }

    await prisma.enrollment.create({
        data: { courseId: id, userId: req.user.id }
    })

    res.json({ message: `Successfully enrolled to ${course.title} course` })
})
