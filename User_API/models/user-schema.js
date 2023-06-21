import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    requried: true,
  },
  fullName: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  avatar: {
    type: String,
    default: `https://img.freepik.com/free-icon/user_318-159711.jpg`,
  },

  googleId: {
    type: String,
    requried: false,
  },
})

export default mongoose.model('user', UserSchema)
