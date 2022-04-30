/* eslint-disable camelcase */
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class FindUserByNickNameDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  nickname!: string
}
