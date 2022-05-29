import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '../models/card.model'

const createNew = async (column) => {
  try {
    const newColumn = await ColumnModel.createNew(column)
    newColumn.cards = []
    await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString())

    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, column) => {
  try {
    const updatedColumn = {
      ...column,
      updatedAt: Date.now()
    }

    if (updatedColumn._id) delete updatedColumn._id
    if (updatedColumn.cards) delete updatedColumn.cards

    const result = await ColumnModel.update(id, updatedColumn)

    if (result._destroy) {
      await CardModel.softDeleteCards(result.cardOrder)
    }

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const softRemove = async (id) => {
  try {
    const removedColumn = await ColumnModel.softRemove(id)
    return removedColumn
  } catch (error) {
    throw new Error(error)
  }
}


export const ColumnService = {
  createNew,
  update,
  softRemove
}