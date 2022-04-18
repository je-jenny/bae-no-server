/* eslint-disable camelcase */
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateVerificationDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 12)
  phoneNumber!: string

  constructor({ phoneNumber }: { phoneNumber: string }) {
    this.phoneNumber = phoneNumber
  }
}
