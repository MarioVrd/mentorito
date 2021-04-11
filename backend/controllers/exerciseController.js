import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'
import validator from 'validator'
import { isValidDeadline } from '../utils/dateUtils.js'

// @desc    Create the exercise for selected course
// @route   POST /api/exercises
// @access  Teacher
export const createExerciseForCourse = asyncHandler(async (req, res) => {
    let { title, description, deadline, courseId } = req.body

    if (!title || !courseId) throw new Error('Invalid request. Title and courseId are required')

    if (!isValidDeadline(deadline))
        throw new Error('Invalid request. Deadline must be date string and in the future')

    deadline = validator.toDate(deadline)

    const exercise = await prisma.exercise.create({
        data: { title, description, deadline, courseId }
    })

    res.json(exercise)
})

// @desc    Update the exercise with selected id
// @route   PUT /api/exercises/:id
// @access  Teacher
export const updateExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    let { title, description, deadline } = req.body

    if (!isValidDeadline(deadline))
        throw new Error('Invalid request. Deadline must be date string and in the future')

    deadline = validator.toDate(deadline)

    const updatedExercise = await prisma.exercise.update({
        where: { id },
        data: { title, description, deadline }
    })

    res.json(updatedExercise)
})

// @desc    Submit the exercise with selected id
// @route   POST /api/exercises/:id/submit
// @access  Student
export const submitExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { studentComment, uploadId } = req.body

    const submittedExercise = await prisma.finishedExercise.create({
        data: { exerciseId: id, studentId: req.user.id, studentComment, uploadId }
    })

    res.json(submittedExercise)
})

// @desc    Update submitted exercise with selected id
// @route   PUT /api/exercises/:id/submit
// @access  Student
export const updateSubmittedExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { studentComment, uploadId } = req.body

    const updatedSubmittedExercise = await prisma.finishedExercise.update({
        where: { studentId_exerciseId: { exerciseId: id, studentId: req.user.id } },
        data: { studentComment, uploadId }
    })

    res.json(updatedSubmittedExercise)
})
