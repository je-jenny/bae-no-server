import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IUserController } from '..'
import {
  BadReqError,
  NotFoundError,
  UnauthorizedError,
} from '../../http-error.class'
import { validateDtos } from '../../validate-dtos'
import {
  CreateUserDto,
  FindUserByNickNameDto,
  UpdateUserProfileDto,
} from '../dtos'
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

    res.json({ success: true, error: null, response: { user } })
  }

  findUserById = async (
    { params: { id }, user }: Request<{ id?: string }>,
    res: Response
  ) => {
    if (!id) {
      throw new BadReqError()
    }
    const parsedId = id === 'me' ? user!.id : Number(id)
    if (!parsedId) {
      throw new BadReqError()
    }

    const found = await this.userService.findUserById(parsedId)

    if (!found) {
      throw new NotFoundError()
    }

    res.json({ success: true, error: null, response: { user: found } })
  }

  findUserByNickName = async (
    { body }: Request<unknown, unknown, FindUserByNickNameDto>,
    res: Response
  ) => {
    const errors = await validateDtos(new FindUserByNickNameDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const found = await this.userService.findUserByNickName(body)

    res.json({ success: true, error: null, response: { user: found } })
  }

  updateUserProfile = async (
    {
      body,
      user,
      params: { id },
    }: Request<{ id?: string }, unknown, UpdateUserProfileDto>,
    res: Response
  ) => {
    if (!user || !id || !Number(id)) {
      throw new BadReqError()
    }

    if (user.id !== Number(id)) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(new UpdateUserProfileDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }
    const updatedUserProfile = await this.userService.updateUserProfile(
      user.id,
      body
    )

    if (!updatedUserProfile) {
      throw new NotFoundError()
    }

    res.json({
      success: true,
      error: null,
      response: { profile: updatedUserProfile },
    })
  }

  deleteUser = async (
    { user, params: { id } }: Request<{ id?: string }, unknown>,
    res: Response
  ) => {
    if (!user || !id || !Number(id)) {
      throw new BadReqError()
    }

    if (user.id !== Number(id)) {
      throw new UnauthorizedError()
    }

    const deletedUser = await this.userService.deleteUser(user.id)

    if (!deletedUser.affected) {
      throw new BadReqError()
    }

    res.json({ success: true, error: null, response: null })
  }
}
