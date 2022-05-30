import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { Service } from 'typedi'
import { BadReqError } from '../../http-error.class'
import { UserService } from '../../user'
import { validateDtos } from '../../validate-dtos'
import { CreateRoomDto } from '../dtos/create-room.dto'
import { RoomService } from '../services'
import { IRoomController } from '../types'

@Service()
export class RoomController implements IRoomController {
  constructor(
    private readonly roomService: RoomService,
  ) {}

  createRoom = async (
    { body }: Request<unknown, unknown, CreateRoomDto>,
    res: Response
  ) => {
    const errors = await validateDtos(plainToInstance(CreateRoomDto, body))
    if (errors) {
      throw new BadReqError(JSON.stringify(errors))
    }
    const room = await this.roomService.createRoom(body)
    res.json({
      success: true,
      error: null,
      response: { room },
    })
  }

  // updateRoom = async (req: Request, res: Response) => {

  // }
}
