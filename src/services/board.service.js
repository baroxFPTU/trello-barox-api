import { BoardModel } from '*/models/board.model'

const createNew = async (newBoard) => {
  try {
    const result = await BoardModel.createNew(newBoard)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)

    board.columns.forEach(column => {
      column.cards = [...board.cards.filter(c => c.columnId.toString() === column._id.toString())]
    })

    delete board.cards

    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  getFullBoard
}