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
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
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

//static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user && user.enabled) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect Password')
  }else if(user && !user.enabled) {
    throw Error('Account is disabled')
  }

  throw Error('Incorrect Email')
}
userSchema.statics.adminLogin = async function (email, password) {
  const user = await this.findOne({ email })
  if (user && user.enabled) {
    if (user.role === 'ADMIN') {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user
      }
      throw Error('Incorrect Password')
    } else {
      throw Error('Unauthorized Email')
    }
  } else if(user && !user.enabled) {
    throw Error('Account is disabled')
  }

  throw Error('Incorrect Email')
}

const User = mongoose.model('user', userSchema)

module.exports = User
