import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(100).trim(),
    cover: Joi.string()
  })

  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: error?.message
    })
  }
}

export const CardValidation = {
  createNew
}