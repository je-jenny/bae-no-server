/* eslint-disable camelcase */
import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @Length(1, 12)
  nickname?: string

  @IsOptional()
  @IsString()
  @Length(1, 12)
  phoneNumber?: string

  constructor({
    nickname,
    phoneNumber,
  }: {
    nickname?: string
    phoneNumber?: string
  }) {
    this.nickname = nickname
    this.phoneNumber = phoneNumber
  }
}
