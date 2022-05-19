import { HttpStatusCode } from '*/utils/constants'
import { CardService } from '*/services/card.service'

const createNew = async (req, res) => {
  try {
    const newCard = await CardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(newCard)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error?.message
    })
  }
}

export const CardController = {
  createNew
}