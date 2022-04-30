import { Expose } from 'class-transformer'

export class UpdateUserAddressReturnDto {
  @Expose()
  id!: number

  @Expose()
  userId!: number

  @Expose()
  name!: string

  @Expose()
  place!: string

  @Expose()
  latitude!: number

  @Expose()
  longitude!: number
}
