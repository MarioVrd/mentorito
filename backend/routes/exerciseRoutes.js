import { Router } from 'express'
import {
    createExerciseForCourse,
    updateExercise,
    submitExercise,
    updateSubmittedExercise
} from '../controllers/exerciseController.js'
import { protect, student, teacher } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').post(protect, teacher, createExerciseForCourse)
router.route('/:id').put(protect, teacher, updateExercise)
router
    .route('/:id/submit')
    .post(protect, student, submitExercise)
    .put(protect, student, updateSubmittedExercise)

export default router
