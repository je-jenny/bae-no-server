/* eslint-disable camelcase */
import { plainToInstance } from 'class-transformer'
import { Service } from 'typedi'
import { DB } from '../../db'
import { VerificationReturnDto } from '../dtos'
import { Verification } from '../entities'

@Service()
export class VerificationRepository {
  verificationRepository

  constructor(private readonly db: DB) {
    this.verificationRepository =
      this.db.AppdataSource.getRepository(Verification)
  }

  createVerification = async ({
    phoneNumber: phone_number,
    code,
  }: {
    phoneNumber: string
    code: string
  }) => {
    const result = await this.verificationRepository
      .createQueryBuilder()
      .insert()
      .into(Verification)
      .values([{ phone_number, code }])
      .returning(['id', 'code'])
      .execute()

    return plainToInstance(VerificationReturnDto, result.raw[0])
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
