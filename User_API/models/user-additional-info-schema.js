import mongoose from 'mongoose'

const UserAdditionalInfo = new mongoose.Schema({
  userID: {
    type: String,
    requried: true,
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
  prefrenceSettings: {
    notifications: { type: Boolean, default: false },
  },
})
