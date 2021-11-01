import BaseController from '../utils/BaseController'
import { burgersService } from '../services/BurgersService'
import { logger } from '../utils/Logger'
export class BurgersController extends BaseController {
  constructor() {
    super('api/burgers')
    this.router
      .get('', this.getAllBurgers)
      .post('', this.createBurger)
      .put(':/id', this.editBurger)
  }

  async getAllBurgers(req, res, next) {
    try {
      const burgers = await burgersService.getAllBurgers()
      logger.log(burgers)
      return res.send(burgers)
    } catch (error) {
      next(error)
    }
  }

  async createBurger(req, res, next) {
    try {
      const burgerData = req.body
      const burger = await burgersService.createBurger(burgerData)
      return res.send({ message: 'burger created', result: burger })
    } catch (error) {
      next(error + ' you fool')
    }
  }

  async editBurger(req, res, next) {
    try {
      const id = req.params.id
      const updatedBurger = req.body
      updatedBurger.id = id
      const burger = await burgersService.editBurger(id, updatedBurger)
      return res.send({ message: 'burger updated', results: burger })
    } catch (error) {
      next(error)
    }
  }
}
