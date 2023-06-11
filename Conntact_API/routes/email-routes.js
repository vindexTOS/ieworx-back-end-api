import express from 'express'

import { sendEmail } from '../controllers/email-controller.js'

const contactRoute = express.Router()

contactRoute.route('/contact').post(sendEmail)

export default contactRoute
