const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const dotenv = require('dotenv')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

const app = express()

const PORT = process.env.PORT || 3000

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

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
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)
app.use(adminRoutes)
