import Joi from 'joi'
import { getDB } from '*/config/mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
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
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

export const ColumnModel = {
  createNew
}