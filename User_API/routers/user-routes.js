import express from 'express'
import {
  Register,
  Login,
  GetUserInformation,
} from '../controllers/user-controller.js'
import { AuthMiddleWare } from '../../Admin_API/MiddleWare/AdminAuthMiddle.js'
import { registerMiddleware, upload } from '../controllers/user-middleware.js'
import {
  googleAuth,
  googleAuthCallback,
  googleAuthRedirect,
} from '../controllers/user-controller.js'

const userRouter = express.Router()

// normal registration
userRouter.post(
  '/register',
  upload.single('avatar'),
  registerMiddleware,
  Register,
)
userRouter.route('/login').post(Login)
// getting user for admins only
userRouter.route('/userGet').get(AuthMiddleWare, GetUserInformation)
/// google auth
userRouter.get('/', googleAuthRedirect)
userRouter.get('/google', googleAuth)
userRouter.get('/google/callback', googleAuthCallback)

export default userRouter
