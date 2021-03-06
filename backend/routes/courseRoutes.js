import { Router } from 'express'
import {
    getCourses,
    getCourseById,
    enrollToCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getEnrolledCourses,
    getCourseNews,
    createNewsForCourse,
    updateCourseNews,
    deleteCourseNews,
    getCourseNewsById,
    createCourseMaterial,
    unenrollCourse
} from '../controllers/courseController.js'
import { admin, enrolled, protect, teacher } from '../middleware/authMiddleware.js'

const router = Router()

router
    .route('/:courseId/news')
    .get(protect, enrolled, getCourseNews)
    .post(protect, teacher, enrolled, createNewsForCourse)
router
    .route('/:courseId/news/:newsId')
    .get(protect, enrolled, getCourseNewsById)
    .put(protect, teacher, enrolled, updateCourseNews)
    .delete(protect, teacher, enrolled, deleteCourseNews)
router.route('/:courseId/materials').post(protect, teacher, enrolled, createCourseMaterial)
router.get('/enrolled', protect, getEnrolledCourses)
router.post('/enroll', protect, enrollToCourse)
router.delete('/:courseId/enroll/:userId', protect, unenrollCourse)
router
    .route('/:courseId')
    .get(protect, enrolled, getCourseById)
    .put(protect, updateCourse)
    .delete(protect, admin, deleteCourse)
router.route('/').get(getCourses).post(protect, admin, createCourse)

export default router
