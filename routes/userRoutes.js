import express from 'express'
import {
    signUp,
    login,
    getSingleUser,
} from '../controllers/userControllers.js'
import { isLoggedIn } from '../middlewares/auth.js'

const router = express.Router()


router.post('/signup', signUp)
router.post('/login', login)
router.get('/user/:id', isLoggedIn, getSingleUser)




export default router