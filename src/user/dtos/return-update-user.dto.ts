import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class UpdatedUserReturnDto {
  @Expose()
  id!: number

  @Expose()
  nickname!: string

  @Expose()
  phone_number!: string
}
