import { CardModel } from '*/models/card.model'

const createNew = async (card) => {
  try {
    const newCard = await CardModel.createNew(card)
    return newCard
  } catch (error) {
    throw new Error(error)
  }
}

export const CardService = {
  createNew
}