import { Service } from 'typedi'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
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
import { JwtPayload, verifyRefresh, sign, verify } from '../../utils'

const JWT_EXPIRED_MSG = 'jwt expired'
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
      id: userId,
      params: { id },
    }: Request<{ id?: string }, unknown, VerifyCodeDto>,
    res: Response
  ) => {
    const parsedId = Number(id)
    if (!id || !parsedId) {
      throw new BadReqError()
    }

    if (!userId) {
      throw new UnauthorizedError()
    }

    const errors = await validateDtos(new VerifyCodeDto(body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }

    const verification = await this.authService.findVerificationById(parsedId)
    if (!verification) {
      throw new NotFoundError()
    }

    // TODO 하나의 트랜잭션으로 묶을 수 있나?
    const updatedUser = await this.userService.updateUserProfile(
      Number(userId),
      {
        phoneNumber: verification.phone_number,
      }
    )

    if (!updatedUser) {
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

  refreshJWT = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.headers.refresh) {
      throw new BadReqError(
        'Access token and Refresh token are need for refresh!'
      )
    }

    const accessToken = req.headers.authorization.split('Bearer ')[1]
    const refreshToken = req.headers.refresh as string

    const authResult = verify(accessToken)
    const decoded = jwt.decode(accessToken) as JwtPayload

    if (!decoded) {
      throw new UnauthorizedError()
    }

    // 재발급을 위해서는 access token이 만료되어 있어야합니다.
    if (authResult.ok || authResult.message !== JWT_EXPIRED_MSG) {
      // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
      throw new BadReqError('Access token is not expired!')
    }

    const refreshResult = await verifyRefresh(refreshToken, decoded.id)

    // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
    if (!refreshResult.ok) {
      throw new UnauthorizedError(refreshResult.message)
    }
    // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
    const user = await this.userService.findUserById(Number(decoded.id))
    if (!user) {
      throw new NotFoundError()
    }

    res.status(200).json({
      success: true,
      error: null,
      response: { accessToken: sign(user), refreshToken },
    })
  }
}
