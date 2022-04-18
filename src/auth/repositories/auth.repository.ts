/* eslint-disable camelcase */
import { Service } from 'typedi'
import { DB } from '../../db'
import { Verification } from '../entities'

@Service()
export class VerificationRepository {
  verificationRepository

  constructor(private readonly db: DB) {
    this.verificationRepository =
      this.db.AppdataSource.getRepository(Verification)
  }

  createVerification = ({
    phoneNumber,
    code,
  }: {
    phoneNumber: string
    code: string
  }) => {
    const verification = new Verification()
    verification.phone_number = phoneNumber
    verification.code = code
    return this.verificationRepository.save(verification)
  }

  findVerificationById(id: number) {
    return this.verificationRepository
      .createQueryBuilder('v')
      .select(['v.code'])
      .where('v.id = :id', { id })
      .getOne()
  }

  findVerificationByPhoneNumberAndCode = ({
    phoneNumber: phone_number,
    code,
  }: {
    phoneNumber: string
    code: string
  }) => {
    return this.verificationRepository
      .createQueryBuilder('verification')
      .where('verification.phone_number = :phone_number', { phone_number })
      .andWhere('verification.code = :code', { code })
      .getOne()
  }

  //   deleteVerificationByPhoneNumberAndCode = ({
  deleteVerificationByIdAndCode = ({
    id,
    code,
  }: {
    id: number
    code: string
  }) => {
    return (
      this.verificationRepository
        .createQueryBuilder('verification')
        .delete()
        .where('id = :id', { id })
        //   .where('phone_number = :phone_number', { phone_number })
        .andWhere('code = :code', { code })
        .execute()
    )
  }
}
