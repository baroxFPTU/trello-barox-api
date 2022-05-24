import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (card) => {
  try {
    const newCard = await CardModel.createNew(card)
    await ColumnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString())

    return newCard
  } catch (error) {
    throw new Error(error)
  }
}

export const CardService = {
  createNew
}