import userSchema from '../models/user-schema.js'
import multer from 'multer'
export const registerMiddleware = async (req, res, next) => {
  const {
    email,
    password,
    repetPassword,
    userName,
    fullName,
    avatar,
  } = req.body
  console.log(req.body)
  try {
    const userExist = await userSchema.findOne({ email: email })
    if (userExist) {
      return res.status(400).json({ msg: 'User Already Exists' })
    }

    if (!password) {
      return res.status(400).json({ msg: 'Please Enter Password ' })
    }

    if (password !== repetPassword) {
      return res.status(400).json({ msg: "Password Don't Match" })
    }

    if (!email) {
      return res.status(400).json({ msg: 'Provide Email' })
    }

    const userNameExists = await userSchema.findOne({ userName: userName })
    if (userNameExists) {
      return res.status(400).jsno({ msg: 'User Name Already Exists' })
    }
    if (!userName) {
      return res.status(400).json({ msg: 'Provide User Name Name' })
    }
    if (!fullName) {
      return res.status(400).json({ msg: 'Please Provide Full Name' })
    }
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Server Error' })
  }
}
export const upload = multer({ dest: 'uploads/' })
