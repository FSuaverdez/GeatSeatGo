const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')
const Order = require('../models/Order')
const nodemailer = require('nodemailer')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = {}

  // Validate email and password length
  if (err.message.includes('order validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports.schedule_get = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ _id: req.params.id })
    const movie = await Movie.findById(schedule.movieId)
    const user = res.locals.currentUser
    res.render('buy', { schedule, movie, user })
  } catch (error) {
    console.log(error)
  }
}

module.exports.schedulesId_get = async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.id)
    res.status(201).json({ schedule })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}

module.exports.buyTicket_post = async (req, res) => {
  let order = new Order({
    scheduleId: req.body.scheduleId,
    email: res.locals.currentUser,
    seats: req.body.seats,
  })
  let schedule = await Schedule.findById(req.body.scheduleId)
  seats = req.body.seats
  if (!req.body.seats || req.body.seats.length === 0) {
    const errors = {
      seatsError: 'Must not be empty',
    }
    return res.status(400).json({ errors })
  }
  let scheduleSeats = schedule.seats

  seats.forEach((seat) => {
    scheduleSeats.forEach((row) => {
      for (s of row) {
        if (s.name == seat) {
          s.taken = true
          console.log(s)
        }
      }
    })
  })
  schedule.seats = scheduleSeats

  try {
    schedule.markModified('seats')
    const editedSchedule = await schedule.save()
    const newOrder = await order.save()

    if (newOrder) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'frannz.dev@gmail.com',
          pass: 'fsuaverdez12345',
        },
      })

      let mailOptions = {
        from: 'frannz.dev@gmail.com',
        to: req.body.email,
        subject: 'GetSeatGo Order',
        text: `Order #${newOrder._id}!\nSeats: ${req.body.seats.join(', ')}`,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }
    res.status(201).json({ order: order._id, schedule })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.orderConfirm_get = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id)
    if (order) {
      // res.status(201).json({ order })
      res.send('Order Successful')
    }
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}
