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
  companyName: {
    type: String,
  },
  roles: {
    type: String,
  },
  contactDetails: {
    phoneNumber: {
      type: String,
    },
  },
  projects_id: {
    type: String,
    default: 'No Projects',
  },
  googleId: {
    type: String,
    requried: false,
  },
})

export default mongoose.model('user', UserSchema)
