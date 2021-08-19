import prisma from '../prisma/client.js'
import asyncHandler from 'express-async-handler'
import validator from 'validator'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
    const courses = await prisma.course.findMany({
        include: { enrolledUsers: true },
        orderBy: { title: 'asc' }
    })

    res.json(courses)
})

// @desc    Fetch course by id
// @route   GET /api/courses/:courseId
// @access  Private
export const getCourseById = asyncHandler(async (req, res) => {
    const course = await prisma.course.findUnique({
        where: { id: req.params.courseId },
        include: {
            enrolledUsers: {
                where: {
                    // student can only see teachers, but admin|teacher can see everyone
                    user: {
                        OR: [
                            {
                                role:
                                    req.user.role === ROLE_STUDENT
                                        ? ROLE_TEACHER
                                        : { in: [ROLE_STUDENT, ROLE_ADMIN, ROLE_TEACHER] }
                            },
                            {
                                id: req.user.id
                            }
                        ]
                    }
                },
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
            news: {
                include: { teacher: { select: { firstName: true, lastName: true } } },
                orderBy: { createdAt: 'desc' }
            },
            materials: {
                include: { upload: true }
            }
        }
    })

    if (!course) {
        res.status(404)
        throw new Error('Nije pronađen kolegij sa odabranim ID-om')
    }

    res.json(course)
})

// @desc    Create a course
// @route   POST /api/courses
// @access  Admin
export const createCourse = asyncHandler(async (req, res) => {
    let { title, description, locked, teachers } = req.body

    if (typeof locked === 'string') validator.toBoolean(locked)

    const course = await prisma.course.create({ data: { title, description, locked } })

    if (teachers?.length > 0) {
        teachers.forEach(async teacherId => {
            await prisma.enrollment.create({ data: { courseId: course.id, userId: teacherId } })
        })
    }

    res.json(course)
})

// @desc    Update the course
// @route   PUT /api/courses/:courseId
// @access  Admin/Enrolled teacher
export const updateCourse = asyncHandler(async (req, res) => {
    if (!(req.user.role === ROLE_TEACHER || req.user.role === ROLE_ADMIN)) {
        res.status(401)
        throw new Error('Nemate dopuštenje za pristup.')
    }

    const { courseId } = req.params
    let { title, description, locked, teachers } = req.body

    if (typeof locked === 'string') locked = validator.toBoolean(locked)

    // Teacher can only lock/unlock enrollment
    if (req.user.role === ROLE_TEACHER) {
        const updated = await prisma.course.update({ where: { id: courseId }, data: { locked } })
        return res.json(updated)
    }

    // Get all enrolled teachers
    const { enrolledUsers: enrolledTeachers } = await prisma.course.findUnique({
        where: { id: courseId },
        select: {
            enrolledUsers: { where: { user: { role: ROLE_TEACHER } }, select: { userId: true } }
        }
    })

    // Unenroll teachers that are not in teachers array
    if (teachers != null) {
        enrolledTeachers.forEach(async teacher => {
            if (teachers.indexOf(teacher.userId) === -1) {
                await prisma.enrollment.delete({
                    where: { userId_courseId: { userId: teacher.userId, courseId } }
                })
            }
        })
    }

    if (teachers?.length > 0) {
        teachers.forEach(async teacherId => {
            await prisma.enrollment.upsert({
                where: { userId_courseId: { userId: teacherId, courseId } },
                update: {},
                create: { courseId: courseId, userId: teacherId }
            })
        })
    }

    const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: { title, description, locked }
    })

    res.json(updatedCourse)
})

// @desc    Delete the course
// @route   DELETE /api/courses/:courseId
// @access  Admin
export const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params

    try {
        const deletedCourse = await prisma.course.delete({ where: { id: courseId } })

        res.json({ message: `Kolegij ${deletedCourse.title} uspješno obrisan` })
    } catch (error) {
        let message = error.message

        if (error.code === 'P2014')
            message = 'Kolegij se ne može izbrisati dok ima upisanih korisnika'

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
    if (!course) throw new Error('Ne postoji kolegij sa odabranim ID-om')

    if (course.locked && req.user.role === ROLE_STUDENT)
        throw new Error('Kolegij je zatvoren za samostalni upis')

    // If userId is specified in req.body enroll specified user (for teacher or admin)
    // If the userId is NOT specified, enroll logged in user
    const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: userId || req.user.id, courseId } }
    })
    if (enrollment) {
        res.status(400)
        throw new Error('Već ste upisani u ovaj kolegij')
    }

    const newEnrollment = await prisma.enrollment.create({
        data: { courseId, userId: userId || req.user.id }
    })

    res.json({ ...newEnrollment, message: `Uspješno ste se upisali u kolegij ${course.title}` })
})

// @desc    Fetch all course news
// @route   GET /api/courses/:courseId/news
// @access  Enrolled/Admin
export const getCourseNews = asyncHandler(async (req, res) => {
    const { courseId } = req.params

    const news = await prisma.courseNews.findMany({
        where: { courseId },
        include: { teacher: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' }
    })

    res.json(news)
})

// @desc    Fetch course news by id
// @route   GET /api/courses/:courseId/news/:newsId
// @access  Enrolled/Admin
export const getCourseNewsById = asyncHandler(async (req, res) => {
    const { newsId } = req.params

    const news = await prisma.courseNews.findUnique({
        where: { id: newsId },
        include: { teacher: { select: { firstName: true } } }
    })

    res.json(news)
})

// @desc    Add news for course
// @route   POST /api/courses/:courseId/news
// @access  Course Teacher
export const createNewsForCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    const { title, content } = req.body

    if (!title) throw new Error('Nepravilan zahtjev! Naslov je obavezan')

    const news = await prisma.courseNews.create({
        data: { title, content, courseId, teacherId: req.user.id }
    })

    res.json(news)
})

// @desc    Update news for course
// @route   POST /api/courses/:courseId/news/:newsId
// @access  Course Teacher
export const updateCourseNews = asyncHandler(async (req, res) => {
    const { newsId } = req.params
    const { title, content } = req.body

    if (!title) throw new Error('Nepravilan zahtjev! Naslov je obavezan')

    const updatedNews = await prisma.courseNews.update({
        where: { id: newsId },
        data: { title, content }
    })

    res.json(updatedNews)
})

// @desc    Delete the course news
// @route   DELETE /api/courses/:courseId/news/:newsId
// @access  Course Teacher
export const deleteCourseNews = asyncHandler(async (req, res) => {
    const { newsId } = req.params

    const deletedNews = await prisma.courseNews.delete({ where: { id: newsId } })

    res.json({ message: `Course news ${deletedNews.title} successfully deleted` })
})

// @desc    Create course materials
// @route   POST /api/courses/:courseId/materials
// @access  Course Teacher
export const createCourseMaterial = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    const { uploadId, description } = req.body

    const material = await prisma.courseMaterial.create({
        data: { courseId, uploadId, description }
    })

    res.json(material)
})
