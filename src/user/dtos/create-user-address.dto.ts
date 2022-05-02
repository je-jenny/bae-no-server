import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserAddressDto {
  @Expose()
  @IsDefined()
  @IsString()
  name!: string

  @Expose()
  @IsDefined()
  @IsString()
  place!: string

  @Expose()
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 14 })
  latitude!: number

  @Expose()
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 14 })
  longitude!: number

  @Expose()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}
