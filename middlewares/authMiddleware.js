const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt exist and verified
  if (token) {
    jwt.verify(token, 'GETSEATGO2020', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login?fromUrl=' + req.originalUrl);
      } else {
        // console.log(decodedToken)
        next();
      }
    });
  } else {
    res.redirect('/login?fromUrl=' + req.originalUrl);
  }
};

// Check Current User

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'GETSEATGO2020', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.currentUser = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.currentUser = user;
        next();
      }
    });
  } else {
    res.locals.currentUser = null;
    next();
  }
};

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt exist and verified
  if (token) {
    jwt.verify(token, 'GETSEATGO2020', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/admin/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/admin/login');
  }
};

module.exports = { requireAuth, checkUser, requireAdminAuth };
