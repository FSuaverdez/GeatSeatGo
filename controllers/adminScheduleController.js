const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')
const User = require('../models/User')

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
