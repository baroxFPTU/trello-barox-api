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
    const updateColumn = {
      ...column,
      updatedAt: Date.now()
    }

    if (updateColumn._id) delete updateColumn._id
    if (updateColumn.cards) delete updateColumn.cards
    if (updateColumn._cardId) {
      await CardModel.update(updateColumn.cardId, { columnId: updateColumn._id })
      delete updateColumn._cardId
    }
    const result = await ColumnModel.update(id, updateColumn)

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