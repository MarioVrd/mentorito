import { Router } from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = Router()

import {
    register,
    login,
    getUserList,
    getUserNotifications,
    markNotificationAsSeen,
    updateMyAccount
} from '../controllers/userController.js'

router.post('/register', protect, admin, register)
router.post('/login', login)
router.put('/notifications/:notificationId', protect, markNotificationAsSeen)
router.get('/notifications', protect, getUserNotifications)
router.put('/me', protect, updateMyAccount)
router.route('/').get(protect, getUserList)

export default router
