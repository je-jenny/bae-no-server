import { Router } from 'express'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { isAuthenticate } from '../middlewares'
import { UserController } from './controllers'

const userController = Container.get(UserController)
const userRouter = Router()

userRouter
  .get('/:id', isAuthenticate, wrap(userController.findUserById))
  .get('', wrap(userController.findUserByNickName))
  .patch('/:id', isAuthenticate, wrap(userController.updateUserProfile))
  .delete('/:id', isAuthenticate, wrap(userController.deleteUser))

export { userRouter }
