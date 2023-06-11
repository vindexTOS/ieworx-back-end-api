import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    requrie: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  number: {
    type: String,
    requrie: true,
    trim: true,
  },
  activity: {
    type: String,
    requrie: true,
    trim: true,
  },
  message: {
    type: String,
    requrie: true,
    trim: true,
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
