import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class VerificationReturnDto {
  @Expose()
  id!: number

  @Expose()
  code!: string
}
