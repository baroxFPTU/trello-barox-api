import { BoardModel } from '*/models/board.model'

const createNew = async (newBoard) => {
  try {
    const result = await BoardModel.createNew(newBoard)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  createNew
}