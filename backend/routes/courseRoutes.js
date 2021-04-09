import { Router } from 'express'
import {
    getCourses,
    getCourseById,
    enrollToCourse,
    createCourse,
    deleteCourse
} from '../controllers/courseController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').get(getCourses).post(protect, admin, createCourse)
router.route('/:id').get(getCourseById).delete(protect, admin, deleteCourse)
router.post('/enroll/:id', protect, enrollToCourse)

export default router
