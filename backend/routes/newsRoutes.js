import { Router } from 'express'
import { createNews, getNews, updateNews, deleteNews } from '../controllers/newsController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').get(getNews).post(protect, admin, createNews)
router.route('/:id').put(protect, admin, updateNews).delete(protect, admin, deleteNews)

export default router
