/**
 * Module for the AuthenticationController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import Bcrypt from 'bcrypt'
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
      res.status(200).send('User post reached...')
    } catch (err) {
      next(err)
    }
  }
}
