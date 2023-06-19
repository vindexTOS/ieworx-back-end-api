import express from 'express'
import { config } from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import connectDB from './connect/connectDB.js'
import contactRoute from './Conntact_API/routes/email-routes.js'
import adminRouter from './Admin_API/routes/admin-routes.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import passport from 'passport'
config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(passport.initialize())
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
    },
  ),
)

app.use(cors())
// app.use('/', adminRouter)
app.use('/email', contactRoute)

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
  console.log(passport)
})

// Google authentication route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// Google authentication callback route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or handle successful authentication
    res.redirect('/protected')
  },
)
// Protected route
app.get('/protected', (req, res) => {
  res.send('Hello, authenticated user!')
})

const port = 5000

const start = async () => {
  await connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`port is listing to ${port}`)
  })
}

start()
