import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'
import validator from 'validator'
import { isValidDeadline } from '../utils/dateUtils.js'
import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles.js'

// @desc    Create the exercise for selected course
// @route   POST /api/exercises
// @access  Teacher
export const createExerciseForCourse = asyncHandler(async (req, res) => {
    let { title, description, deadline, courseId } = req.body

    if (!title || !courseId) throw new Error('Invalid request. Title and courseId are required')

    if (deadline != null) {
        if (!isValidDeadline(deadline))
            throw new Error('Invalid request. Deadline must be date and in the future')

        deadline = validator.toDate(deadline)
    }

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

// @desc    Get exercise by id
// @route   GET /api/exercises/:id
// @access  Private
export const getExerciseById = asyncHandler(async (req, res) => {
    const { id } = req.params

    // Show all finished exercises for admin and teacher or
    // only personal finished exercise for student
    const inclFinishedExercises =
        req.user.role === ROLE_ADMIN || req.user.role === ROLE_TEACHER
            ? {
                  // For teacher|admin include student data and upload
                  include: {
                      upload: true,
                      student: { select: { firstName: true, lastName: true, email: true } }
                  }
              }
            : {
                  where: { studentId: req.user.id },
                  // For student only include upload
                  include: { upload: true }
              }

    const exercise = await prisma.exercise.findUnique({
        where: { id },
        include: {
            course: true,
            finishedExercises: inclFinishedExercises
        },
        rejectOnNotFound: true
    })

    res.json(exercise)
})

// @desc    Submit the exercise with selected id
// @route   POST /api/exercises/:id/submit
// @access  Student
export const submitExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { studentComment, uploadId } = req.body

    const exercise = await prisma.exercise.findUnique({ where: { id }, rejectOnNotFound: true })

    if (validator.isAfter(new Date().toISOString(), exercise.deadline.toISOString()))
        throw new Error('Invalid request, passed the deadline')

    const submittedExercise = await prisma.finishedExercise.create({
        data: { exerciseId: id, studentId: req.user.id, studentComment, uploadId }
    })

    res.json(submittedExercise)
})

// @desc    Update submitted exercise with selected id
// @route   PUT /api/exercises/:id/submit
// @access  Student/Teacher
export const updateSubmittedExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { studentComment, uploadId, teacherComment, grade, studentId } = req.body

    if (req.user.role === ROLE_TEACHER && !studentId)
        throw new Error('Invalid request, studentId is missing')

    const exercise = await prisma.exercise.findUnique({ where: { id }, rejectOnNotFound: true })

    // If the deadline is passed and user is student, throw an error
    // Teacher can update after deadline to give a grade or add a comment
    if (
        validator.isAfter(new Date().toISOString(), exercise.deadline.toISOString()) &&
        req.user.role === ROLE_STUDENT
    )
        throw new Error('Invalid request, passed the deadline')

    let data = { studentComment, uploadId }

    if (req.user.role === ROLE_TEACHER) {
        data = { teacherComment, grade }
    }

    const updatedSubmittedExercise = await prisma.finishedExercise.update({
        where: { studentId_exerciseId: { exerciseId: id, studentId: studentId || req.user.id } },
        data
    })

    res.json(updatedSubmittedExercise)
})
