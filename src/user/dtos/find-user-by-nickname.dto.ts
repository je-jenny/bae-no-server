/* eslint-disable camelcase */
import { IsNotEmpty, IsString } from 'class-validator'

export class FindUserByNickNameDto {
  @IsNotEmpty()
  @IsString()
  nickname!: string

  constructor({ nickname }: { nickname: string }) {
    this.nickname = nickname
  }
}
