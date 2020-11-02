const mongoose = require('mongoose')
const slugify = require('slugify')

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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

movieSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const Movie = mongoose.model('movie', movieSchema)

module.exports = Movie
