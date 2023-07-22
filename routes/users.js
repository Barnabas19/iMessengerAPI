import express from 'express'
import { getUsers, getUserDetails } from '../controllers/user/userData.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/users', getUsers)
router.get('/userDetails', auth, getUserDetails)

export default router