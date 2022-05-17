import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { BoardRoutes } from './board.route'

const router = express.Router()

/**
  GET v1/status
*/
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))

/**
  Board APIs
*/
router.use('/boards', BoardRoutes)

export const apiV1 = router