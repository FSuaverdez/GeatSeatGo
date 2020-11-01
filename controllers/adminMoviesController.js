const Movie = require('../models/Movie')

const handleErrors = (err) => {
  console.log(err.message, err.code)
  const errors = { title: '', description: '', imgUrl: '', trailerUrl: '' }

  // Incorrect email
  if (err.message === 'Incorrect Email') {
    errors.email = 'Email is not registered'
  }

  // Incorrect passowrd
  if (err.message === 'Incorrect Password') {
    errors.password = 'Incorrect Password'
  }

  // Validate email and password length
  if (err.message.includes('movie validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties)
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports.movies_get = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: 'desc' })

  res.render('admin/adminMovies', { movies })
}
module.exports.newMovies_get = async (req, res) => {
  res.render('admin/adminMoviesNew', { movie: new Movie() })
}
module.exports.newMovies_post = async (req, res) => {
  let movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    trailerUrl: req.body.trailerUrl,
  })
  try {
    movie = await movie.save()
    res.redirect('/admin/movies')
  } catch (err) {
    const errors = handleErrors(err)
    res.render('admin/adminMoviesNew', { movie })
  }
}
