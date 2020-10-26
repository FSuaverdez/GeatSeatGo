const mongoose = require('mongoose')
const id = new mongoose.Types.ObjectId().toHexString()
const _id = {
  type: String,
  required: true,
  default: id,
}

const userSchema = new mongoose.Schema(
  {
    _id,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    createdBy: {
      type: String,
      required: true,
      default: id,
    },
    modifiedBy: {
      type: String,
      required: true,
      default: id,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)

module.exports = User
