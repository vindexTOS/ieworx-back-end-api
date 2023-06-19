import jwt from 'jsonwebtoken'
import adminSchema from '../models/admin-schema.js'
import { config } from 'dotenv'
config()
const verifyToken = async (token) => {
  if (!token) {
    throw new Error('No Token Provided')
  }

  const decoded = jwt.verify(token, process.env.JWT_STRING)
  const userId = decoded.user._id
  try {
    const user = await adminSchema.findById(userId)

    if (!user) {
      throw new Error('User Dont Exist ')
    }

    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const AuthMiddleWare = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer', '').trim()

  if (!token) {
    return res.status(401).json({ msg: 'No Token' })
  }

  try {
    const user = await verifyToken(token)
    req.user = user

    if (user.role !== 'admin') {
      return res.status(400).json({ msg: 'Premision denied ' })
    }
    next()
  } catch (error) {
    return res.status(401).json({ msg: error.message })
  }
}
