const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')

module.exports.movies_get = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: 'desc' })
  const schedules = await Schedule.find().sort({ createdAt: 'desc' })

  const scheduledMovies = movies.filter((movie) => {
    const check = schedules.find((sched) => {
      return movie._id == sched.movieId
    })

    if (check) {
      return movie
    }
  })

  res.render('home', { scheduledMovies })
}

module.exports.movieSlug_get = async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug })
    console.log(movie)
    res.render('moviePage', { movie })
  } catch (error) {
    console.log(error)
  }
}
