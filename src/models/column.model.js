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

const createNew = async (newColumn) => {
  try {
    const vaildColumn = await validateSchema(newColumn)
    const result = await getDB().collection(columnCollectionName).insertOne(vaildColumn)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, column) => {
  try {
    const updatedColumn = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: column },
      { returnDocument: 'after' }
    )
    console.log(updatedColumn)
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
  createNew,
  update,
  softRemove
}