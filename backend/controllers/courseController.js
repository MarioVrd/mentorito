import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'
import validator from 'validator'

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
