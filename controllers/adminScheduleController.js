const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')
const User = require('../models/User')
const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = {}

  // Validate email and password length
  if (err.message.includes('movie validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
  }
  if (err.message.includes('Cast to ObjectId failed')) {
    errors.movieId = 'Movie Not Found'
  }

  return errors
}

module.exports.schedules_get = async (req, res) => {
  let scheduleQuery = Schedule.find().sort({ createdAt: 'desc' })
  if (req.query.id != null && req.query.id != '') {
    scheduleQuery = scheduleQuery.regex('_id', new RegExp(req.query.title, 'i'))
  }

  try {
    const movies = await Movie.find().sort({ createdAt: 'desc' })

    const schedules = await scheduleQuery.exec()
    res.render('admin/schedule', { movies, schedules, search: req.query })
  } catch (error) {
    console.log(error)
  }
}

module.exports.schedules_post = async (req, res) => {
  let schedule = new Schedule({
    movieId: req.body.movieId,
    cinema: req.body.cinema,
    dateTime: req.body.dateTime,
  })
  try {
    const movie = await Movie.findById(req.body.movieId)
    schedule = await schedule.save()
    res.status(201).json({ schedule: schedule._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.schedules_delete = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id)
    res.status(201).json({ successful: true })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports.schedules_edit = async (req, res) => {
  let schedule = await Schedule.findById(req.params.id)
  schedule.movieId = req.body.movieId
  schedule.cinema = req.body.cinema
  schedule.dateTime = req.body.dateTime
  try {
    const movie = await Movie.findById(req.body.movieId)
    const editedSchedule = await schedule.save()
    res.status(201).json({ schedule: editedSchedule._id })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({ errors })
  }
}
