/* eslint-disable camelcase */
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ProfileProvider } from '../entities'

export class FindUserByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  constructor({ email }: { email: string; provider: ProfileProvider }) {
    this.email = email
  }
}
