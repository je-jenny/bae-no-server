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
    { params: { id }, id: userId }: Request<{ id?: string }>,
    res: Response
  ) => {
    if (!id) {
      throw new BadReqError()
    }
    const parsedId = id === 'me' ? Number(userId) : Number(id)
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
      id: userId,
      params: { id },
    }: Request<{ id?: string }, unknown, UpdateUserProfileDto>,
    res: Response
  ) => {
    const parsedUserId = Number(userId)
    const parsedParamId = Number(id)

    if (!parsedUserId || !id || !parsedParamId) {
      throw new BadReqError()
    }

    if (parsedUserId !== Number(id)) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(new UpdateUserProfileDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }
    const updatedUserProfile = await this.userService.updateUserProfile(
      parsedUserId,
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
    { body, id: userId }: Request<unknown, unknown, CreateUserAddressDto>,
    res: Response
  ) => {
    const parsedUserId = Number(userId)
    if (!parsedUserId) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(
      plainToInstance(CreateUserAddressDto, body)
    )
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const address = await this.userService.createUserAddress(parsedUserId, body)

    res.json({
      success: true,
      error: null,
      response: { address },
    })
  }

  updateUserAddress = async (
    {
      body,
      id: userId,
      params: { id },
    }: Request<{ id?: string }, unknown, UpdateUserAddressDto>,
    res: Response
  ) => {
    const parsedUserId = Number(userId)
    const parsedId = Number(id)

    if (!parsedId) {
      throw new BadReqError()
    }
    if (!parsedUserId) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(
      plainToInstance(UpdateUserAddressDto, body)
    )
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }
    const updatedAddress = await this.userService.updateUserAddress(
      { id: parsedId, userId: parsedUserId },
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
    { id: userId, params: { id } }: Request<{ id?: string }, unknown>,
    res: Response
  ) => {
    const parsedUserId = Number(userId)
    const parsedId = Number(id)

    if (!id || !parsedId) {
      throw new BadReqError()
    }

    if (!parsedUserId) {
      throw new UnauthorizedError()
    }
    const deletedAddress = await this.userService.deleteUserAddress(
      parsedId,
      parsedUserId
    )

    if (!deletedAddress.affected) {
      throw new BadReqError()
    }

    res.json({ success: true, error: null, response: null })
  }

  deleteUser = async (
    { id: userId, params: { id } }: Request<{ id?: string }, unknown>,
    res: Response
  ) => {
    const parsedUserId = Number(userId)
    const parsedParamId = Number(id)

    if (!parsedUserId || !id || !parsedParamId) {
      throw new BadReqError()
    }

    if (parsedUserId !== parsedParamId) {
      throw new UnauthorizedError()
    }

    const deletedUser = await this.userService.deleteUser(parsedUserId)

    if (!deletedUser.affected) {
      throw new BadReqError()
    }

    res.json({ success: true, error: null, response: null })
  }
}
