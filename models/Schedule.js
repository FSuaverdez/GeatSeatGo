const mongoose = require('mongoose')
const seats = require('./seats')

const scheduleSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: [true, 'Movie ID is required'],
    },
    cinema: {
      type: Number,
      required: [true, 'Cinema Number is Required'],
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and Time is Required'],
    },
    seats: {
      type: Array,
      required: true,
      default: seats,
    },
  },
  { timestamps: true }
)

const Schedule = mongoose.model('schedule', scheduleSchema)

module.exports = Schedule
