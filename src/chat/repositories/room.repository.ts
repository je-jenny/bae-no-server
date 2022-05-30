import { Service } from 'typedi'
import { plainToInstance } from 'class-transformer'
import { CreateRoomDto } from '../dtos/create-room.dto'
import { ParticipateIn, Room } from '../entities'
import { DB } from '../../db'
import { CreateRoomReturnDto } from '../dtos'
import { User } from '../../user'

@Service()
export class RoomRepository {
  private roomRepository

  constructor(private readonly db: DB) {
    this.roomRepository = this.db.AppdataSource.getRepository(Room)
  }

  async createRoom(
    relation: ParticipateIn,
    { userId: _, ...data }: CreateRoomDto
  ) {
    const room = data as Room
    if (!room.participateIn) {
      room.participateIn = []
    }
    room.participateIn?.push(relation)
    const {
      id,
      title,
      foodCategory,
      restaurantName,
      minUser,
      deliveryFee,
      participateIn,
    } = await this.roomRepository.save(room)
    const userId = participateIn?.at(0)?.user?.id
    return plainToInstance(CreateRoomReturnDto, {
      id,
      title,
      foodCategory,
      restaurantName,
      minUser,
      deliveryFee,
      userId,
    })
  }
}
