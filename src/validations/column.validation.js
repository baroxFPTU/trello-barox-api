import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required().trim(),
    title: Joi.string().required().min(3).max(20)
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

const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(20)
  })

  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: error?.message
    })
  }
}

const softRemove = async (req, res, next) => {
  const condition = Joi.object({
    id: Joi.string().required()
  })

  try {
    console.log(req.params)
    await condition.validateAsync(req.params, { abortEarly: true })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: error?.message
    })
  }
}

export const ColumnValidation = {
  createNew,
  update,
  softRemove
}