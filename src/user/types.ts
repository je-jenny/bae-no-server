import { Request, Response } from 'express'
import { ProfileProvider, User } from '.'

export interface CreateUser {
  user: { email: string }
  profile: { nickname: string; provider: ProfileProvider }
}

export interface IUserController {
  createUser(req: Request, res: Response): Promise<void>
}

export interface IUserService {
  createUser(data: CreateUser): Promise<User>
}
