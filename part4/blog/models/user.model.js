const mongoose = require('mongoose')
const uniqueVal = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    require: true,
    minLength: 3
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

userSchema.plugin(uniqueVal)

const User = mongoose.model('User', userSchema)

module.exports = User
