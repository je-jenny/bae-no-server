import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IUserController } from '..'
import { BadReqError } from '../../http-error.class'
import { validateDtos } from '../../validate-dtos'
import { CreateUserDto } from '../dtos'
import { UserService } from '../services'

@Service()
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  createUser = async (
    { body }: Request<unknown, unknown, CreateUserDto>,
    res: Response
  ) => {
    const errors = await validateDtos(new CreateUserDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const user = await this.userService.createUser(body)

    res.json({ user })
  }
}
