import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'

const createNew = async (newBoard) => {
  try {
    const result = await BoardModel.createNew(newBoard)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, board) => {
  try {
    const updateBoard = {
      ...board,
      updatedAt: Date.now()
    }

    if (updateBoard._id) delete updateBoard._id
    if (updateBoard.columns) delete updateBoard.columns

    const result = await BoardModel.update(id, updateBoard)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)

    if (!board || !board.columns) throw new Error('Board not found')

    const transformedBoard = cloneDeep(board)
    transformedBoard.columns = transformedBoard.columns.filter(col => !col._destroy)

    transformedBoard.columns.forEach(column => {
      column.cards = [...transformedBoard.cards.filter(c => c.columnId.toString() === column._id.toString())]
    })

    delete transformedBoard.cards

    return transformedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew,
  update,
  getFullBoard
}