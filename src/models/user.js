/**
 * Mongoose model User.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import val from 'validator'

// Create a schema.
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    validate: [val.isEmail, 'Please enter a valid email.']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minlength: [8, 'Minimum password length is 8 characters.'],
    maxlength: 1024
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const User = mongoose.model('User', schema)
