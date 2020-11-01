const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must not be empty'],
    },
    description: {
      type: String,
      required: [true, 'Description must not be empty'],
    },
    imgUrl: {
      type: String,
      required: [true, 'Image URL must not be empty'],
    },
    trailerUrl: {
      type: String,
      required: [true, 'Trailer URL must not be empty'],
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model('movie', movieSchema)

module.exports = Movie
