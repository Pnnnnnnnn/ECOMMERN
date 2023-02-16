import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { register, login, updateMe } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/me', verifyToken, updateMe)

export default router