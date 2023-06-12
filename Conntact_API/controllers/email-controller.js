import emailSchema from '../moduls/email-schema.js'

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
