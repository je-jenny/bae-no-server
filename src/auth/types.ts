import { Response, Request } from 'express'
import { DeleteResult } from 'typeorm'
import { VerificationReturnDto } from '.'
import { Verification } from './entities'

export interface IAuthService {
  createVerification: ({
    phoneNumber,
  }: {
    phoneNumber: string
  }) => Promise<VerificationReturnDto>

  findVerificationById(id: number): Promise<Verification | null>

  findVerificationByPhoneNumberAndCode({
    phoneNumber,
    code,
  }: {
    phoneNumber: string
    code: string
  }): Promise<Verification | null>

  deleteVerificationByIdAndCode(data: {
    id: number
    code: string
  }): Promise<DeleteResult>
}

export interface IAuthController {
  createVerification: (req: Request, res: Response) => Promise<void>
  verifyCode: (req: Request, res: Response) => Promise<void>
  refreshJWT: (req: Request, res: Response) => Promise<void>
}
