const User = require('../models/User')

module.exports.signup_get = (req, res) => {
  res.render('signup')
}

module.exports.login_get = (req, res) => {
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({
      email,
      password,
      role: 'ADMIN',
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).send('user, not created')
  }

  res.send('New Signup')
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  console.log('Log Ins: ', email, password)
  res.send('User Login')
}
