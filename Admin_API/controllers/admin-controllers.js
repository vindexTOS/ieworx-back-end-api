import adminSchema from '../moduls/admin-schema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
config()
export const login = async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await adminSchema.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ msg: 'Email not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'invalid password' })
    }

    user.password = null

    const token = jwt.sign({ user }, process.env.JTW_STRING, {
      expiresIn: '1h',
    }) /// add JWT_STRING to .env and add random letters of your choise

    res.set('Authorization', `Bearer ${token}`)
    return res.status(200).json({ token, user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Internet Error' })
  }
}
