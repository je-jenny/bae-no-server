import { Service } from 'typedi'
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { IUserController } from '..'
import {
  BadReqError,
  NotFoundError,
  UnauthorizedError,
} from '../../http-error.class'
import { validateDtos } from '../../validate-dtos'
import {
  CreateUserAddressDto,
  FindUserByNickNameDto,
  UpdateUserAddressDto,
  UpdateUserProfileDto,
} from '../dtos'
import { UserService } from '../services'

@Service()
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  // TODO 미사용
  //   createUser = async (
  //     { body }: Request<unknown, unknown, CreateUserDto>,
  //     res: Response
  //   ) => {
  //     const errors = await validateDtos(new CreateUserDto(body))
  //     if (errors) {
  //       throw new BadReqError(JSON.stringify(errors))
  //     }

  //     const user = await this.userService.createUser(body)

  //     res.json({ success: true, error: null, response: { user } })
  //   }

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
    {
      query,
      query: { nickname },
    }: Request<unknown, unknown, unknown, { nickname?: string }>,
    res: Response
  ) => {
    if (!nickname) {
      throw new BadReqError()
    }
    const errors = await validateDtos(
      plainToInstance(FindUserByNickNameDto, query)
    )
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const result = await this.userService.findUserByNickName(nickname)

    if (result) {
      throw new BadReqError('Already exists')
    }

    res.json({
      success: true,
      error: null,
      response: null,
    })
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

  createUserAddress = async (
    { body, user }: Request<unknown, unknown, CreateUserAddressDto>,
    res: Response
  ) => {
    if (!user) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(
      plainToInstance(CreateUserAddressDto, body)
    )
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const address = await this.userService.createUserAddress(user.id, body)

    res.json({
      success: true,
      error: null,
      response: { address },
    })
  }

  updateUserAddress = async (
    {
      body,
      user,
      params: { id },
    }: Request<{ id?: string }, unknown, UpdateUserAddressDto>,
    res: Response
  ) => {
    const parsedId = Number(id)
    if (!parsedId) {
      throw new BadReqError()
    }
    if (!user) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(
      plainToInstance(UpdateUserAddressDto, body)
    )
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }
    const updatedAddress = await this.userService.updateUserAddress(
      { id: parsedId, userId: user.id },
      body
    )

    if (!updatedAddress) {
      throw new NotFoundError()
    }

    res.json({
      success: true,
      error: null,
      response: { address: updatedAddress },
    })
  }

  deleteUserAddress = async (
    { user, params: { id } }: Request<{ id?: string }, unknown>,
    res: Response
  ) => {
    const parsedId = Number(id)
    if (!id || !parsedId) {
      throw new BadReqError()
    }

    if (!user) {
      throw new UnauthorizedError()
    }
    const deletedAddress = await this.userService.deleteUserAddress(
      parsedId,
      user.id
    )

    if (!deletedAddress.affected) {
      throw new BadReqError()
    }

    res.json({ success: true, error: null, response: null })
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
