import { Router } from 'express'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { UserController } from './controllers'

const userRouter = Router()

const userController = Container.get(UserController)

userRouter.post('', wrap(userController.createUser))

export { userRouter }
