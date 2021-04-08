import { Router } from 'express'
import { getCourses, getCourseById, enrollToCourse } from '../controllers/courseController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').get(getCourses)
router.route('/:id').get(getCourseById)
router.post('/enroll/:id', protect, enrollToCourse)

export default router
