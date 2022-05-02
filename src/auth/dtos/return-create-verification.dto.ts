import { Expose } from 'class-transformer'

export class VerificationReturnDto {
  @Expose()
  id!: number

  @Expose()
  code!: string
}
