/**
 * Module for the AuthenticationController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import mongoose from 'mongoose'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

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
        res.sendStatus(400)
      }
      if (err.code === 11000) {
        res.sendStatus(409)
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
        res.sendStatus(401)
      } else {
        const isValid = await user.valPass(password)
        if (isValid) {
          const tokenData = {
            id: user.id,
            email: user.email
          }
          const createdToken = await generateToken(tokenData)
          res.json({
            access_token: createdToken
          })
        } else {
          res.sendStatus(401)
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

/**
 * Function that returns a json web token containing the data given.
 *
 * @param {object} tokenData - As the data to be contained within the token.
 * @returns {string} - The json web token.
 */
async function generateToken (tokenData) {
  const signOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  }
  const privateKey = Buffer.from(process.env.PRIVATE_KEY64, 'base64')
  return jwt.sign(tokenData, privateKey, signOptions)
}
