const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: [true, 'Movie ID is required'],
    },

    seats: {
      type: Array,
      required: [true, 'Seats is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('order', orderSchema)

module.exports = Order
