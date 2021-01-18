const User = require('../models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = { email: '', password: '' }

  // Unauthorized email
  if (err.message === 'Unauthorized Email') {
    errors.email = 'Unauthorized Email'
  }

  if (err.message === 'Account is disabled') {
    errors.email = 'Account is disabled'
  }

  // Incorrect email
  if (err.message === 'Incorrect Email') {
    errors.email = 'Email is not registered'
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

// CREATE COOKIE TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, 'GETSEATGO2020', {
    expiresIn: MAX_AGE,
  })
}
// RENDER LOGIN PAGE
module.exports.admin_login_get = (req, res) => {
  if (res.locals.user) {
    return res.redirect('/')
  }
  res.render('admin/adminLogin')
}
// POST REQUEST FOR LOGIN
module.exports.admin_login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.adminLogin(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

// LOGOUT
module.exports.admin_logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/admin/login')
}

// Redirect to Admin movies
module.exports.admin_get = (req, res) => {
  res.redirect('/admin/movies')
}
