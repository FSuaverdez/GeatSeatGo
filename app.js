const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes')
const dotenv = require('dotenv')
const app = express()

const PORT = process.env.PORT || 3000

// middleware
app.use(express.static('public'))
app.use(express.json())

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
    console.log('MongoDB connected')
    console.log(`Listening to port ${PORT}`)
  })
  .catch((err) => console.log(err))

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRouter)
