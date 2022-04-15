import { Request, Response } from 'express'
import { Service } from 'typedi'
import { IUserController } from '..'
import { UserService } from '../services'

@Service()
export class UserController implements IUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response) {
    const body = req.body as any

    const user = await this.userService.createUser(body)

    res.json({ user })
  }
}
