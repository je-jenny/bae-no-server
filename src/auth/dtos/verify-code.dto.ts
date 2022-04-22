/* eslint-disable camelcase */
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class VerifyCodeDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code!: string

  constructor({ code }: { code: string }) {
    this.code = code
  }
}
