import { Router } from 'express'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { authJWT } from '../middlewares'
import { RoomController } from './controllers'

const roomController = Container.get(RoomController)
const roomRouter = Router()

roomRouter.post('', authJWT, wrap(roomController.createRoom))

export { roomRouter }
