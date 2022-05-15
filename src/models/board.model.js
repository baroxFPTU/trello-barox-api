import Joi from 'joi'
import { getDB } from '*/config/mongodb'

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (boardTarget) => {
  return await boardCollectionSchema.validateAsync(boardTarget, { abortEarly: false })
}

const createNew = async (newBoard) => {
  try {
    const validBoard = await validateSchema(newBoard)
    const result = await getDB().collection(boardCollectionName).insertOne(validBoard)
    console.log(result)
  } catch (error) {
    console.error(error) //which invalid will come here
  }
}

export const BoardModel = {
  createNew
}