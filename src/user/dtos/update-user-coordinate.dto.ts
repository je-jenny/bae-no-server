/* eslint-disable camelcase */
import { IsDefined, IsNumber } from 'class-validator'

export class UpdateUserProfileCoordinateDto {
  @IsDefined()
  @IsNumber()
  latitude!: number

  @IsDefined()
  @IsNumber()
  longitude!: number
}
