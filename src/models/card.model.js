import Joi from 'joi'
import { getDB } from '*/config/mongodb'

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).trim(),
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (cardTarget) => {
  return await cardCollectionSchema.validateAsync(cardTarget, { abortEarly: false })
}

const createNew = async (newCard) => {
  try {
    const validCard = await validateSchema(newCard)
    const result = await getDB().collection(cardCollectionName).insertOne(validCard)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = {
  createNew
}