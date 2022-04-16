import { Router } from 'express'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { UserController } from './controllers'

const userController = Container.get(UserController)
const userRouter = Router()

userRouter.post('', wrap(userController.createUser))

export { userRouter }
