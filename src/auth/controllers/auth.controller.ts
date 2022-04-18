import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IAuthController } from '../types'
import { AuthService } from '../services'
import { CreateVerificationDto, VerifyCodeDto } from '../dtos'
import { validateDtos } from '../../validate-dtos'
import {
  BadReqError,
  NotFoundError,
  UnauthorizedError,
} from '../../http-error.class'
import { UserService } from '../../user'

@Service()
export class AuthController implements IAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  createVerification = async (
    { body }: Request<unknown, unknown, CreateVerificationDto>,
    res: Response
  ) => {
    const errors = await validateDtos(new CreateVerificationDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const verification = await this.authService.createVerification({
      phoneNumber: body.phoneNumber,
    })

    res.json({ success: true, error: null, response: { verification } })
  }

  /**
   *
   * @param param verificationID
   * @param res
   */
  verifyCode = async (
    {
      body,
      user,
      params: { id },
    }: Request<{ id?: string }, unknown, VerifyCodeDto>,
    res: Response
  ) => {
    if (!id || !Number(id)) {
      throw new BadReqError()
    }

    if (!user) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(new VerifyCodeDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const verification = await this.authService.findVerificationById(Number(id))
    if (!verification) {
      throw new NotFoundError()
    }

    // TODO 하나의 트랜잭션으로 묶을 수 있나?
    const updatedUser = await this.userService.updateUserProfile(user.id, {
      phoneNumber: verification.phone_number,
    })

    if (!updatedUser.affected) {
      throw new NotFoundError()
    }

    const result = await this.authService.deleteVerificationByIdAndCode({
      id: Number(id),
      code: body.code,
    })

    if (!result.affected) {
      throw new NotFoundError()
    }
    res.json({ success: true, error: null, response: null })
  }
}
