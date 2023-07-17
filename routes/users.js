import express from 'express'
import { getUsers } from '../controllers/user/userData.js'


const router = express.Router()

router.get('/users', getUsers)

export default router