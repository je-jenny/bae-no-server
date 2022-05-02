import { Expose } from 'class-transformer'

export class UpdatedUserReturnDto {
  @Expose()
  id!: number

  @Expose()
  nickname!: string

  @Expose()
  phone_number!: string
}
