import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import bcrypt from 'bcrypt'
import userSchema from '../models/user-schema.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { config } from 'dotenv'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
config()

const bucketName = process.env.AWS_BUCKET_NAME

const accessKeyId = process.env.AWS_ACCESS_KEY

const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export const Register = async (req, res) => {
  const { password, email, userName, fullName, avatar } = req.body

  try {
    if (req.file) {
      const fileExtension = req.file.originalname.split('.').pop()
      const fileName = `image_${Date.now()}.${fileExtension}`

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fs.createReadStream(req.file.path),
        ContentType: req.file.mimetype,
      }

      const command = new PutObjectCommand(params)
      const { Location } = await s3.send(command) // getting URL from S3 bucket

      const photoURL = `https://${bucketName}.s3.eu-north-1.amazonaws.com/${fileName}` // manualy creating link
      console.log(photoURL)
      avatar = photoURL
    }

    const HasshedPassword = await bcrypt.hash(password, 10)

    await userSchema.create({
      password: HasshedPassword,
      email,
      userName,
      fullName,
      avatar,
    })
  } catch (error) {}
}

// google authnetication working in progess //////////////////////////

export const googleAuthRedirect = async (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
}

export const googleAuth = passport.authenticate('google', {
  scope: ['profile'],
})
export const googleAuthCallback = passport.authenticate(
  'google',
  { failureRedirect: '/login' },
  (req, res) => {
    // Redirect or respond with success message
  },
)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken)
      // Perform additional actions with the authenticated user, e.g., store in database
      // Call the callback function (cb) with the authenticated user or any error
      cb(null, profile)
    },
  ),
)
