const Movie = require('../models/Movie')
const Schedule = require('../models/Schedule')

// Get movie list
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

// Get movie detail and render movie page
module.exports.movieSlug_get = async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug })
    if (movie) {
      const id = movie._id
      const schedules = await Schedule.find({ movieId: id })
      res.render('moviePage', { movie, schedules })
    }
  } catch (error) {
    console.log(error)
  }
}
