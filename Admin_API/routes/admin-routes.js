import express from 'express'
import { login } from '../controllers/admin-controllers.js'

const adminRouter = express.Router()

adminRouter.route('/login').post(login)

export default adminRouter
