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
		where: { id: req.params.id }
	})

	res.json(course)
})
