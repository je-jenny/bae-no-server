import { Request, Response } from 'express'
import { CreateRoomReturnDto } from './dtos'
import { CreateRoomDto } from './dtos/create-room.dto'

export interface IRoomController {
  createRoom(req: Request, res: Response): Promise<void>
  // updateRoom(req: Request, res: Response): Promise<void>
  // TODO: find room
}

export interface IRoomService {
  createRoom(data: CreateRoomDto): Promise<CreateRoomReturnDto>
  // TODO: update room
  // TODO: find room
}
