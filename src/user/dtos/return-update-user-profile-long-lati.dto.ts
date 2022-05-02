import { Expose } from 'class-transformer'

export class UpdatedUserLongLatiReturnDto {
  @Expose()
  id!: number

  @Expose()
  latitude!: number

  @Expose()
  longitude!: number
}
