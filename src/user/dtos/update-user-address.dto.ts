import { Expose } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserAddressDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string

  @Expose()
  @IsOptional()
  @IsString()
  place?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  latitude?: number

  @Expose()
  @IsOptional()
  @IsNumber()
  longitude?: number

  @Expose()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}
