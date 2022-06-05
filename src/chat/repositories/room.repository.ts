import { Service } from 'typedi'
import { plainToInstance } from 'class-transformer'
import { ParticipateIn, Room } from '../entities'
import { DB } from '../../db'
import { CreateRoomReturnDto } from '../dtos'

@Service()
export class RoomRepository {
  private roomRepository

  constructor(private readonly db: DB) {
    this.roomRepository = this.db.AppdataSource.getRepository(Room)
  }

  async createRoom(relation: ParticipateIn, room: Room) {
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
