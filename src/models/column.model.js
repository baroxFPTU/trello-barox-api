import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  boardId: Joi.string().required(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (columnTarget) => {
  return await columnCollectionSchema.validateAsync(columnTarget, { abortEarly: false })
}

const createNew = async (column) => {
  try {
    const vaildColumn = await validateSchema(column)
    const insertColumn = {
      ...vaildColumn,
      boardId: ObjectId(vaildColumn.boardId)
    }

    const result = await getDB().collection(columnCollectionName).insertOne(insertColumn)
    const newColumn = await getDB().collection(columnCollectionName).findOne({ _id: result.insertedId })
    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {String} columnId
 * @param {String} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const updatedColumn = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(columnId) },
      { $push: { cardOrder: cardId } },
      { returnDocument: 'after' }
    )

    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, column) => {
  try {
    const updateColumn = {
      ...column
    }

    if (column.boardId) updateColumn.boardId = ObjectId(column.boardId)

    const updatedColumn = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateColumn },
      { returnDocument: 'after' }
    )
    return updatedColumn.value
  } catch (error) {
    throw new Error(error)
  }
}

const softRemove = async (id) => {
  try {
    const removedColumn = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { _destroy: true } },
      { returnDocument: 'after' }
    )
    return removedColumn.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  pushCardOrder,
  softRemove
}