const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: [true, 'Email already registered'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter an password'],
      minlength: [6, 'Minimun password length is 6 characters'],
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    createdBy: {
      type: String,
      required: true,
    },
    modifiedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('user', userSchema)


module.exports = User
