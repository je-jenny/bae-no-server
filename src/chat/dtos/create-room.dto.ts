import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsDefined()
  @IsNumber()
  userId!: number

  @IsNotEmpty()
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  foodCategory!: string

  @IsNotEmpty()
  @IsString()
  restaurantName!: string

  @IsDefined()
  @IsNumber()
  minUser!: number

  @IsDefined()
  deliveryFee!: number
}
