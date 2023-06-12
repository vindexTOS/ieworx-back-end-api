import express from 'express'
import { config } from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import connectDB from './connect/connectDB.js'
import contactRoute from './Conntact_API/routes/email-routes.js'
import adminRouter from './Admin_API/routes/admin-routes.js'
config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/', adminRouter)
app.use('/email', contactRoute)
const port = 5000

const start = async () => {
  await connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`port is listing to ${port}`)
  })
}

start()
