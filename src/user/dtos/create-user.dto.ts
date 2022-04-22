/* eslint-disable camelcase */
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { ProfileProvider, PROFILE_PROFILE_ARRAY } from '../entities'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsEnum(PROFILE_PROFILE_ARRAY)
  provider!: ProfileProvider

  constructor({
    email,
    provider,
  }: {
    email: string
    provider: ProfileProvider
  }) {
    this.email = email
    this.provider = provider
  }
}
