import { BadRequest } from '../utils/Errors'
import { logger } from "../utils/Logger"

const FakeDB = {
  burgers: [{
    name: 'double cheeseburger',
    id: 0
  },
  {
    name: 'chicken sandwich',
    id: 1
  }
  ]
}

class BurgersService {
  async getAllBurgers() {
    const burgers = await FakeDB.burgers
    return burgers
  }

  async createBurger(burgerData) {
    burgerData.id = FakeDB.burgers.length.toString()
    await FakeDB.burgers.push(burgerData)
    return burgerData
  }

  async editBurger(id, updatedBurger) {
    const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
    if (burgerIndex === -1) {
      throw new BadRequest('no burger found')
    }
    FakeDB.burgers.splice(burgerIndex, 1, updatedBurger)
    return updatedBurger
  }
}

export const burgersService = new BurgersService()
