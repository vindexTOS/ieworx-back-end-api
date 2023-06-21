import express from 'express'
import { Register } from '../controllers/user-controller.js'
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
  Register,
)

/// google auth
userRouter.get('/', googleAuthRedirect)
userRouter.get('/google', googleAuth)
userRouter.get('/google/callback', googleAuthCallback)

export default userRouter
