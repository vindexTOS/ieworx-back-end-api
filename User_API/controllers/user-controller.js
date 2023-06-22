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
  const { password, email, userName, fullName } = req.body
  let avatar = ''
  try {
    if (req.file) {
      console.log(req.file)
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
      avatar = photoURL
      console.log(photoURL)
    }

    const HasshedPassword = await bcrypt.hash(password, 10)

    await userSchema.create({
      password: HasshedPassword,
      email,
      userName,
      fullName,
      avatar,
    })

    const user = await userSchema.findOne({ email: email })

    user.password = null
    const token = jwt.sign({ user }, process.env.JWT_STRING, {
      expiresIn: '2 days',
    })

    res.set('Authorization', `Bearer ${token}`)
    if (user) {
      return res.status(200).json({ token, user })
    } else if (!user) {
      return res.status(201).json({ message: 'Try to sign in' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Server Error', error: error.message })
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userSchema.find({ email: email })

    if (!user) {
      return res.status(400).json({ msg: 'User Does Not Exists' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Password Invalid' })
    }

    user.password = null
    const token = jwt.sign({ user }, process.env.JWT_STRING, {
      expiresIn: '2 days',
    })

    res.set('Authorization', `Bearer ${token}`)
    return res.status(200).json({ token, user })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error', error })
  }
}

// for admins only

export const GetUserInformation = async (req, res) => {
  try {
    const users = await userSchema.find({})

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error', error })
  }
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
