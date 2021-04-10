import { Router } from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = Router()

import { register, login } from '../controllers/userController.js'

router.post('/register', protect, admin, register)
router.post('/login', login)

export default router
