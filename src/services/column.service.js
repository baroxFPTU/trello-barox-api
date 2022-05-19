import { ColumnModel } from '*/models/column.model'

const createNew = async (newColumn) => {
  try {
    const result = await ColumnModel.createNew(newColumn)
    return result
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