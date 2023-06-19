import emailSchema from '../models/email-schema.js'

export const sendEmail = async (req, res) => {
  const { name, email, number, message, activity } = req.body

  try {
    if (!name || !email || !number || !message || !activity) {
      return res
        .status(400)
        .json({ msg: 'Please Provied All The Information ' })
    }
    await emailSchema.create(req.body)
    return res.status(200).json({ msg: 'Your Email Was Sent Successfully' })
  } catch (error) {
    return res.status(500).json({ msg: error })
  }
}

export const getEmails = async (req, res) => {
  const search = req.query.search
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  let query = {}

  if (search) {
    const searchType = req.query.searchType

    if (searchType === 'number') {
      query = {
        number: { $regex: search, $options: 'i' },
      }
    } else if (searchType === 'name') {
      query = {
        name: { $regex: search, $options: 'i' },
      }
    } else if (searchType === 'activity') {
      query = {
        activity: { $regex: search, $options: 'i' },
      }
    } else if (searchType === 'message') {
      query = {
        message: { $regex: search, $options: 'i' },
      }
    } else {
      query = {
        email: { $regex: search, $options: 'i' },
      }
    }
  }

  const totalEmail = await emailSchema.countDocuments(query)
  const totalPages = Math.ceil(totalEmail / limit)

  try {
    let emailData = await emailSchema.find(query)
    emailData = emailData.reverse()
    emailData = emailData.slice(startIndex, endIndex)
    return res.status(200).json({ emailData, totalPages, totalEmail })
  } catch (error) {
    return res.status(500).json('server error')
  }
}
