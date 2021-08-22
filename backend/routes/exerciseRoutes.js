import { Router } from 'express'
import {
    createExerciseForCourse,
    updateExercise,
    submitExercise,
    updateSubmittedExercise,
    getExerciseById,
    deleteExercise
} from '../controllers/exerciseController.js'
import { protect, student, teacher } from '../middleware/authMiddleware.js'

const router = Router()

router
    .route('/:id/submit')
    .post(protect, student, submitExercise)
    .put(protect, updateSubmittedExercise)
router
    .route('/:id')
    .get(protect, getExerciseById)
    .put(protect, teacher, updateExercise)
    .delete(protect, teacher, deleteExercise)
router.route('/').post(protect, teacher, createExerciseForCourse)

export default router
