const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check if jwt exist and verified
  if (token) {
    jwt.verify(token, 'GETSEATGO2020', (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect('/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

// Check Current User

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'GETSEATGO2020', async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken)
        const user = await User.findById(decodedToken.id)
        res.locals.user = user
        console.log(user)
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check if jwt exist and verified
  if (token) {
    jwt.verify(token, 'GETSEATGO2020', (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect('/admin/login')
      } else {
        console.log(decodedToken)
        if (res.locals.user.role === 'ADMIN') {
          next()
        } else {
          throw Error('Not Authorized')
        }
      }
    })
  } else {
    res.redirect('/admin/login')
  }
}

module.exports = { requireAuth, checkUser, requireAdminAuth }
