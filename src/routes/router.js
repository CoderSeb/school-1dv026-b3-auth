/**
 * The routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

router.use('/', (req, res, next) => {
  res.status(200).send('Reached the root of auth!')
})

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(res.sendStatus(404)))
