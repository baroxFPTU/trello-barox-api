import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (boardTarget) => {
  return await boardCollectionSchema.validateAsync(boardTarget, { abortEarly: false })
}

const createNew = async (board) => {
  try {
    const validBoard = await validateSchema(board)
    const result = await getDB().collection(boardCollectionName).insertOne(validBoard)
    const newBoard = await getDB().collection(boardCollectionName).findOne({ _id: result.insertedId })

    return newBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (boardId, newBoard) => {
  try {
    const updatedBoard = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $set: newBoard },
      { returnDocument: 'after' }
    )
    return updatedBoard.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {String} boardId
 * @param {String} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const updatedBoard = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: columnId } },
      { returnDocument: 'after' }
    )

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await getDB().collection(boardCollectionName).aggregate([
      {
        $match: {
          _id: ObjectId(boardId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: ColumnModel.columnCollectionName,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: CardModel.cardCollectionName,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ]).toArray()
    return board[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = {
  createNew,
  update,
  pushColumnOrder,
  getFullBoard
}

/*
c??i hay h???c t??? Joi
- thay v?? cho m???t validate function, return result th??ng b??o h???p l??? ho???c kh??ng.
=> th?? c?? l???i => b???n l???i (Throw error) => b???t l???i v???i trycatch. C??n ????ng, th?? v???n ch???y t??? tr??n xu???ng nh?? b??nh th?????ng.
*/