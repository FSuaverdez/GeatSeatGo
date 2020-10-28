const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const dotenv = require('dotenv')
const colors = require('colors')
const cookieParser = require('cookie-parser')

const app = express()

const PORT = process.env.PORT || 3000

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

dotenv.config()

// database connection

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(process.env.PORT)
    console.log('MongoDB connected'.green.bold.underline)
    console.log(
      `Listening to port http://localhost:${PORT}/`.green.bold.underline
    )
  })
  .catch((err) => console.log(`Error: ${err.message}`.red.underline.bold))

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRoutes)
app.use(adminRoutes)

app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false)
  res.cookie('isEmployee', true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  })
  res.send('you got the cookies!')
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  res.json(cookies)
})
