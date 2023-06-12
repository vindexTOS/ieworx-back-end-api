import express from 'express'
import { AuthMiddleWare } from '../../Admin_API/MiddleWare/AdminAuthMiddle.js'
import { sendEmail, getEmails } from '../controllers/email-controller.js'

const contactRoute = express.Router()

contactRoute.route('/contact').post(sendEmail).get(AuthMiddleWare, getEmails)

export default contactRoute
