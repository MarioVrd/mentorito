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

    if (!title || !courseId) throw new Error('Nepravilan zahtjev! Naslov i ID kolegija su obavezni')

    if (deadline != null) {
        if (!isValidDeadline(deadline))
            throw new Error(
                'Nepravilan zahtjev! Rok za predaju mora biti u obliku datuma i u budućnosti'
            )

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
        throw new Error(
            'Nepravilan zahtjev! Rok za predaju mora biti u obliku datuma i u budućnosti'
        )

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
    const inclExerciseSubmissions =
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
            exerciseSubmissions: inclExerciseSubmissions
        }
    })

    if (!exercise) {
        res.status(404)
        throw new Error('Nije pronađena odabrana vježba')
    }

    res.json(exercise)
})

// @desc    Delete exercise with selected id
// @route   DELETE /api/exercises/:id
// @access  Teacher
export const deleteExercise = asyncHandler(async (req, res) => {
    const { id } = req.params

    // To delete exercise we must first delete all related submissions
    const deleteSubmissions = prisma.exerciseSubmission.deleteMany({
        where: { exerciseId: id }
    })

    const deleteExercise = prisma.exercise.delete({ where: { id } })

    const transaction = await prisma.$transaction([deleteSubmissions, deleteExercise])

    res.json({ message: 'Vježba uspješno obrisana' })
})

// @desc    Submit the exercise with selected id
// @route   POST /api/exercises/:id/submit
// @access  Student
export const submitExercise = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { studentComment, uploadId } = req.body

    const exercise = await prisma.exercise.findUnique({ where: { id } })

    if (!exercise) {
        res.status(404)
        throw new Error('Nije pronađena odabrana vježba')
    }

    if (
        exercise.deadline &&
        validator.isAfter(new Date().toISOString(), exercise.deadline.toISOString())
    )
        throw new Error('Nepravilan zahtjev! Rok za predaju je prošao')

    const submittedExercise = await prisma.exerciseSubmission.create({
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
        throw new Error('Nepravilan zahtjev! ID studenta mora biti sadržan')

    const exercise = await prisma.exercise.findUnique({ where: { id } })

    if (!exercise) {
        res.status(404)
        throw new Error('Nije pronađena odabrana vježba')
    }

    // If the deadline is passed and user is student, throw an error
    // Teacher can update after deadline to give a grade or add a comment
    if (
        exercise.deadline &&
        validator.isAfter(new Date().toISOString(), exercise.deadline.toISOString()) &&
        req.user.role === ROLE_STUDENT
    )
        throw new Error('Nepravilan zahtjev! Rok za predaju je prošao')

    let data = { studentComment, uploadId }

    if (req.user.role === ROLE_TEACHER) {
        let notifData = null

        if (teacherComment && grade) {
            notifData = {
                exerciseId: exercise.id,
                courseId: exercise.courseId,
                text: `Profesor ${req.user.firstName} ${req.user.lastName} je komentirao i dodao ocjenu na vježbu ${exercise.title}`
            }
        } else if (teacherComment) {
            notifData = {
                exerciseId: exercise.id,
                courseId: exercise.courseId,
                text: `Profesor ${req.user.firstName} ${req.user.lastName} je komentirao vježbu ${exercise.title}`
            }
        } else if (grade) {
            notifData = {
                exerciseId: exercise.id,
                courseId: exercise.courseId,
                text: `Profesor ${req.user.firstName} ${req.user.lastName} je  dodao ocjenu na vježbu ${exercise.title}`
            }
        }

        if (notifData) {
            const notification = await prisma.notification.create({ data: notifData })
            const userNotification = await prisma.userNotification.create({
                data: { notificationId: notification.id, userId: studentId }
            })
        }

        data = { teacherComment, grade }
    }

    const updatedSubmittedExercise = await prisma.exerciseSubmission.update({
        where: { studentId_exerciseId: { exerciseId: id, studentId: studentId || req.user.id } },
        data
    })

    res.json(updatedSubmittedExercise)
})
