const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = { email: '', password: '' }
  if (err.name === 'MongoError' && err.code === 11000) {
    errors['email'] = 'Email already registered'
    return errors
  }

  // Validate email and password length
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// Users
module.exports.users_get = async (req, res) => {
  let userQuery = User.find().sort({ createdAt: 'desc' })
  if (res.locals.currentUser.role !== 'ADMIN') {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/admin/login')
    return
  }

  if (req.query.email != null && req.query.email != '') {
    userQuery = userQuery.regex('email', new RegExp(req.query.email, 'i'))
  }

  try {
    const users = await userQuery.exec()
    res.render('admin/user', { users, search: req.query })
  } catch (error) {
    console.log(error)
  }
}

// Create User
module.exports.users_post = async (req, res) => {
  let id = new mongoose.Types.ObjectId().toHexString()
  const salt = await bcrypt.genSalt()
  req.body.password = await bcrypt.hash(req.body.password, salt)
  let user = new User({
    _id: id,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    createdBy: req.body.createdBy,
    modifiedBy: req.body.modifiedBy,
    enabled: req.body.enabled,
  })

  try {
    user = await user.save()
    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

// Edit User
module.exports.users_edit = async (req, res) => {
  let user = await User.findById(req.params.id)
  user.email = req.body.email
  user.role = req.body.role
  user.modifiedBy = req.body.modifiedBy
  user.enabled = req.body.enabled

  try {
    const editedUser = await user.save()
    res.status(201).json({ user: editedUser._id })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}
