import { ColumnService } from '*/services/column.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
  try {
    const newColumn = await ColumnService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(newColumn)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error?.message
    })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const updatedColumn = await ColumnService.update(id, req.body)
    res.status(HttpStatusCode.OK).json(updatedColumn)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error?.message
    })
  }
}

const softRemove = async (req, res) => {
  try {
    const { id } = req.params
    const removedColumn = await ColumnService.softRemove(id)
    res.status(HttpStatusCode.OK).json(removedColumn)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error?.message
    })
  }
}

export const ColumnController = {
  createNew,
  update,
  softRemove
}
