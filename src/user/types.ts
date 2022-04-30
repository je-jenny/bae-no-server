import { Request, Response } from 'express'
import { UpdateResult } from 'typeorm'
import { User } from '.'
import {
  CreateUserDto,
  FindUserByNickNameDto,
  UpdatedUserLongLatiReturnDto,
  UpdatedUserReturnDto,
  UpdateUserProfileCoordinateDto,
  UpdateUserProfileDto,
} from './dtos'

export interface IUserController {
  createUser(req: Request, res: Response): Promise<void>
  findUserById(req: Request, res: Response): Promise<void>
  findUserByNickName(req: Request, res: Response): Promise<void>
  updateUserProfile(req: Request, res: Response): Promise<void>
  updateUserProfileCoordinate(req: Request, res: Response): Promise<void>
  deleteUser(req: Request, res: Response): Promise<void>
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<User>
  findUserById(id: number): Promise<User | null>
  findUserByNickName({
    nickname,
  }: FindUserByNickNameDto): Promise<FindUserByNickNameDto | null>
  updateUserProfile(
    id: number,
    data: UpdateUserProfileDto
  ): Promise<UpdatedUserReturnDto>

  updateUserProfileCoordinate(
    id: number,
    data: UpdateUserProfileCoordinateDto
  ): Promise<UpdatedUserLongLatiReturnDto>

  deleteUser(id: number): Promise<UpdateResult>
}
