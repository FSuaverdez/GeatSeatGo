const Movie = require('../models/Movie')
const Order = require('../models/Order')
const Schedule = require('../models/Schedule')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = {}

  // Validate email and password length
  if (err.message.includes('order validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// Orders
module.exports.order_get = async (req, res) => {
  let orders = await Order.find().sort({ createdAt: 'desc' })
  if (res.locals.currentUser.role !== 'ADMIN') {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/admin/login')
    return
  }
  if (req.query.id != null && req.query.id != '') {
    orders = orders.filter((order) => {
      const id = '' + order._id
      return id.includes(req.query.id)
    })
  }
  try {
    res.render('admin/order', { orders, search: req.query })
  } catch (error) {
    console.log(error)
  }
}

// Create Orders
module.exports.order_post = async (req, res) => {
  let order = new Order({
    scheduleId: req.body.scheduleId,
    email: req.body.email,
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
    res.status(201).json({ order: order._id, schedule })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}
