import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { User } from '.'
import {
  CreateUserAddressDto,
  CreateUserDto,
  FindUserByNickNameDto,
  UpdatedUserReturnDto,
  UpdateUserAddressDto,
  UpdateUserAddressReturnDto,
  UpdateUserProfileDto,
} from './dtos'

export interface IUserController {
  //   createUser(req: Request, res: Response): Promise<void>
  findUserById(req: Request, res: Response): Promise<void>
  findUserByNickName(req: Request, res: Response): Promise<void>
  updateUserProfile(req: Request, res: Response): Promise<void>
  createUserAddress(req: Request, res: Response): Promise<void>
  updateUserAddress(req: Request, res: Response): Promise<void>
  deleteUserAddress(req: Request, res: Response): Promise<void>
  deleteUser(req: Request, res: Response): Promise<void>
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<User>
  findUserById(id: number): Promise<User | null>
  findUserByNickName(nickname: string): Promise<FindUserByNickNameDto | null>
  updateUserProfile(
    id: number,
    data: UpdateUserProfileDto
  ): Promise<UpdatedUserReturnDto>

  createUserAddress(
    id: number,
    data: CreateUserAddressDto
  ): Promise<CreateUserAddressDto>

  updateUserAddress(
    ids: { id: number; userId: number },
    data: UpdateUserAddressDto
  ): Promise<UpdateUserAddressReturnDto>

  deleteUserAddress(id: number, userId: number): Promise<DeleteResult>
  deleteUser(id: number): Promise<UpdateResult>
}
