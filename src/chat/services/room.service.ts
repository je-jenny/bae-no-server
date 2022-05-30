import { Service } from 'typedi'
import { NotFoundError } from '../../http-error.class'
import { UserRepository } from '../../user'
import { CreateRoomDto, CreateRoomReturnDto } from '../dtos'
import { ParticipateIn } from '../entities'
import { RoomRepository } from '../repositories'
import { IRoomService } from '../types'

@Service()
export class RoomService implements IRoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository
  ) {}

  async createRoom(data: CreateRoomDto): Promise<CreateRoomReturnDto> {
    const user = await this.userRepository.findUserById(data.userId)
    if (!user) {
      throw new NotFoundError('Not Found User')
    }
    const relation = await ParticipateIn.participate(user, true)
    return await this.roomRepository.createRoom(relation, data)
  }
}