import { BoardService } from '*/services/board.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message ? error.message : error
    })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const updatedColumn = await BoardService.update(id, req.body)
    res.status(HttpStatusCode.OK).json(updatedColumn)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error?.message
    })
  }
}

const getFullBoard = async (req, res) => {
  const { id } = req.params

  try {
    const board = await BoardService.getFullBoard(id)
    res.status(HttpStatusCode.OK).json(board)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message ? error.message : error
    })
  }
}

export const BoardController = {
  createNew,
  update,
  getFullBoard
}