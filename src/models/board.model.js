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
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = {
  createNew
}

/*
cái hay học từ Joi
- thay vì cho một validate function, return result thông báo hợp lệ hoặc không.
=> thì có lỗi => bắn lỗi (Throw error) => bắt lỗi với trycatch. Còn đúng, thì vẫn chạy từ trên xuống như bình thường.
*/