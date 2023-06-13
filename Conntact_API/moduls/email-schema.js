import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  activity: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date(),
  },
})

// example json data for testing with postman

// {
//     "name":"name",
// "activity":" activity",
//     "email":"email@gmail.com",
//     "number":"123456890",
//     "message":"text test test test message test text message"
// }

export default mongoose.model('contact-form', emailSchema)
