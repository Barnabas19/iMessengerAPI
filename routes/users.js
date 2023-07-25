import express from 'express'
import { getUsers, getUserDetails } from '../controllers/user/userData.js'
import { addToSentFriendRequests } from '../controllers/user/userNetwork.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/users', getUsers)
router.get('/userDetails', auth, getUserDetails)
router.post('/addFriend', auth, addToSentFriendRequests)


export default router