import express from 'express'
import authContrtoller  from '../controllers/authController.js'
import verifyToken from '../middlewares/verifyToken.js'
const router = express.Router()

router.post('/signup',authContrtoller.signup)
router.post('/login',authContrtoller.login)
router.get('/logout',authContrtoller.logout)
router.post('/googlesignup',verifyToken,authContrtoller.googleSignup)
router.get('/me',verifyToken,authContrtoller.getMe)
export default router
