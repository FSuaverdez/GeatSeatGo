const User = require('../models/User')
const mongoose = require('mongoose')

const handleErrors = (err) => {
  const errors = { email: '', password: '' }

  // Validate if email is unique
  if (err.name === 'MongoError' && err.code === 11000) {
    errors['email'] = 'Email already registered'
    return errors
  }

  // Validate email and password length
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports.signup_get = (req, res) => {
  res.render('signup')
}

module.exports.login_get = (req, res) => {
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    let id = new mongoose.Types.ObjectId().toHexString()
    let createdBy = id
    let modifiedBy = id

    const user = await User.create({
      _id: id,
      email,
      password,
      role: 'ADMIN',
      createdBy,
      modifiedBy,
    })
    return res.status(201).json(user)
  } catch (error) {
    const errors = handleErrors(error)
    return res.status(400).json({ errors })
  }

  res.send('New Signup')
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  console.log('Log Ins: ', email, password)
  res.send('User Login')
}

module.exports.login_get = (req, res) => {
  res.render('admin/adminLogin')
}
