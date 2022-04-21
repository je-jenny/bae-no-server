import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class VerificationReturnDto {
  @Expose()
  private id!: number

  @Expose()
  private code!: string
}
