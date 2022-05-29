import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (column) => {
  try {
    const newColumn = await ColumnModel.createNew(column)
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

    // if (column.boardId)

    const result = await ColumnModel.update(id, updatedColumn)
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