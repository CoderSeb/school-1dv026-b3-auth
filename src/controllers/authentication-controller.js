/**
 * Module for the AuthenticationController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports

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

  /**
   * Logs in a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginUser (req, res, next) {
    try {
      res.status(200).send('User login reached...')
    } catch (err) {
      next(err)
    }
  }
}
