import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { BoardRoutes } from './board.route'
import { ColumnRoutes } from './column.route'
import { CardRoutes } from './card.route'

const router = express.Router()

/**
* GET v1/status
*/
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))

/**
* Board APIs
*/
router.use('/boards', BoardRoutes)

/**
 * Column APIs
 */
router.use('/columns', ColumnRoutes)

/**
 * Card APIs
 */
router.use('/cards', CardRoutes)

export const apiV1 = router