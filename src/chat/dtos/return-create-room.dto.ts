import { Expose } from 'class-transformer'

export class CreateRoomReturnDto {
  @Expose()
  userId!: number

  @Expose({ name: 'id' })
  roomId!: number

  @Expose()
  title!: string

  @Expose()
  foodCategory!: string

  @Expose()
  restaurantName!: string

  @Expose()
  minUser!: number

  @Expose()
  deliveryFee!: number
}
