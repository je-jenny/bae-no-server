import { Expose } from 'class-transformer'

export class CreateUserAddressReturnDto {
  @Expose()
  id!: number

  @Expose()
  name!: string

  @Expose()
  place!: string

  @Expose()
  latitude!: number

  @Expose()
  longitude!: number
}
