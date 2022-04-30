import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class UpdatedUserLongLatiReturnDto {
  @Expose()
  id!: number

  @Expose()
  latitude!: number

  @Expose()
  longitude!: number
}
