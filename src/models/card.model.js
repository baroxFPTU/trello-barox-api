import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

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

const createNew = async (card) => {
  try {
    const validCard = await validateSchema(card)
    const insertCard = {
      ...validCard,
      boardId: ObjectId(validCard.boardId),
      columnId: ObjectId(validCard.columnId)
    }

    const result = await getDB().collection(cardCollectionName).insertOne(insertCard)
    const newCard = await getDB().collection(cardCollectionName).findOne({ _id: result.insertedId })
    return newCard
  } catch (error) {
    throw new Error(error)
  }
}


const update = async (cardId, newCard) => {
  const updateCard = {
    ...newCard
  }

  if (newCard.boardId) updateCard.boardId = ObjectId(newCard.boardId)
  if (newCard.columnId) updateCard.columnId = ObjectId(newCard.columnId)

  try {
    const updatedBoard = await getDB().collection(cardCollectionName).findOneAndUpdate(
      { _id: ObjectId(cardId) },
      { $set: updateCard },
      { returnDocument: 'after' }
    )
    return updatedBoard.value
  } catch (error) {
    throw new Error(error)
  }
}

const softDeleteCards = async (cardIds) => {
  const transformCardIds = cardIds.map(cardId => ObjectId(cardId))
  try {
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: transformCardIds } },
      { $set: { _destroy: true } }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = {
  cardCollectionName,
  createNew,
  update,
  softDeleteCards
}