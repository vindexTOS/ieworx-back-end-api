import { config } from 'dotenv'

import connectDB from './connect/connectDB.js'

import adminSchema from './Admin_API/moduls/admin-schema.js'

import bcrypt from 'bcrypt'
config()
const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    const password = await bcrypt.hash('', 10) // input password of your choise as first parameter
    await adminSchema.create({
      email: '', // input email of your choise
      password: password, /// encrypted password goes to database and can be de crepted on front end
      role: 'admin', // leave role as an "admin" string
    })
    process.exit(0)
    // when admin is registered to database delete the password and email fealeds in here
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// <<<<<<<<<<<<<<<<<<<<<<starting registration>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// stop terminal if its running with Ctrl & C
// type npm nodemon populate.js or yarn nodemon populate.js
// check database
// Ctrl & C
// comment populate()

//<<<<<<<<<< COMMENT OUT populate() TO INVOCE THE FUNCTION >>>>>>>>>>>>>>>>>>
// populate()
