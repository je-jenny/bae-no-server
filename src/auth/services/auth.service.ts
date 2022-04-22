import { Service } from 'typedi'
import { IAuthService } from '..'
import { VerificationRepository } from '../repositories'
import { generateRandomCode } from '../../utils'

@Service()
export class AuthService implements IAuthService {
  constructor(
    private readonly verificationRepository: VerificationRepository
  ) {}

  createVerification = ({ phoneNumber }: { phoneNumber: string }) => {
    const code = generateRandomCode(6)
    return this.verificationRepository.createVerification({ phoneNumber, code })
  }

  findVerificationById = (id: number) => {
    return this.verificationRepository.findVerificationById(id)
  }

  // TODO 미사용
  findVerificationByPhoneNumberAndCode = (data: {
    phoneNumber: string
    code: string
  }) => {
    return this.verificationRepository.findVerificationByPhoneNumberAndCode(
      data
    )
  }

  deleteVerificationByIdAndCode = (data: { id: number; code: string }) => {
    return this.verificationRepository.deleteVerificationByIdAndCode(data)
  }
}
