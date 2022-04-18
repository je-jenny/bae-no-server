/* eslint-disable camelcase */
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class VerifyCodeDto {
  //   @IsNotEmpty()
  //   @IsString()
  //   @Length(10, 12)
  //   phoneNumber!: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code!: string

  constructor({ code }: { code: string }) {
    //   constructor({ phoneNumber, code }: { phoneNumber: string; code: string }) {
    // this.phoneNumber = phoneNumber
    this.code = code
  }
}
