import { Router } from 'express'
import {
    createNews,
    getNews,
    updateNews,
    deleteNews,
    getNewsById
} from '../controllers/newsController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').get(getNews).post(protect, admin, createNews)
router
    .route('/:id')
    .get(getNewsById)
    .put(protect, admin, updateNews)
    .delete(protect, admin, deleteNews)

export default router
