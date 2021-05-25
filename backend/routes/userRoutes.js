import { Router } from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = Router()

import { register, login, getUserList } from '../controllers/userController.js'

router.post('/register', protect, admin, register)
router.post('/login', login)
router.route('/').get(protect, getUserList)

export default router
