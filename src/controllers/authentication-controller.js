/**
 * Module for the AuthenticationController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import mongoose from 'mongoose'
import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class AuthenticationController {
  /**
   * Registers a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerUser (req, res, next) {
    try {
      const { email, password } = req.body
      const user = new User({
        email: email,
        password: password
      })

      await user.save()
      res.status(201).send({ id: user.id })
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send('Validation Error')
      }
      if (err.code === 11000) {
        res.status(409).send('Duplicate Keys')
      }
      next(err)
    }
  }

  /**
   * Logs in a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginUser (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email: email })

      if (!user) {
        res.status(409).send('Invalid credentials')
      } else {
        const isValid = await user.valPass(password)
        if (isValid) {
          res.status(200).send('It works! Correct password!')
        } else {
          res.status(409).send('Invalid credentials')
        }
      }
    } catch (err) {
      next(err)
    }
  }
}
