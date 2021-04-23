import { Router } from 'express'
import {
    getCourses,
    getCourseById,
    enrollToCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getEnrolledCourses
} from '../controllers/courseController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/enrolled', protect, getEnrolledCourses)
router.post('/enroll', protect, enrollToCourse)
router
    .route('/:id')
    .get(getCourseById)
    .put(protect, admin, updateCourse)
    .delete(protect, admin, deleteCourse)
router.route('/').get(getCourses).post(protect, admin, createCourse)

export default router
