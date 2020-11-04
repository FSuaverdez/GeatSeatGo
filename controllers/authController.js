const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = { email: '', password: '' }

  // Incorrect email
  if (err.message === 'Incorrect Email') {
    errors.email = 'Email is not registered'
  }

  if (err.message === 'Account is disabled') {
    errors.email = 'Account is disabled'
  }

  // Incorrect passowrd
  if (err.message === 'Incorrect Password') {
    errors.password = 'Incorrect Password'
  }

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

const MAX_AGE = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, 'GETSEATGO2020', {
    expiresIn: MAX_AGE,
  })
}

module.exports.signup_get = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/')
  }

  res.render('signup')
}

module.exports.login_get = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/')
  }
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  let { email, password } = req.body
  const salt = await bcrypt.genSalt()
  password = await bcrypt.hash(password, salt)

  try {
    let id = new mongoose.Types.ObjectId().toHexString()
    let createdBy = id
    let modifiedBy = id

    const user = await User.create({
      _id: id,
      email,
      password,
      role: 'USER',
      createdBy,
      modifiedBy,
    })
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 })
    return res.status(201).json({ user: user._id })
  } catch (error) {
    const errors = handleErrors(error)
    return res.status(400).json({ errors })
  }

  res.send('New Signup')
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
