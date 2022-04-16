import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { ProfileProvider, PROFILE_PROFILE_ARRAY } from '../entities'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  nickname!: string

  @IsNotEmpty()
  @IsEnum(PROFILE_PROFILE_ARRAY)
  provider!: ProfileProvider

  constructor({
    email,
    nickname,
    provider,
  }: {
    email: string
    nickname: string
    provider: ProfileProvider
  }) {
    this.email = email
    this.nickname = nickname
    this.provider = provider
  }
}
