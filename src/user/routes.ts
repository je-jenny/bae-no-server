import { Router } from 'express'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { authJWT } from '../middlewares'
import { UserController } from './controllers'

const userController = Container.get(UserController)
const userRouter = Router()

userRouter
  .get('/:id', authJWT, wrap(userController.findUserById))
  .get('', wrap(userController.findUserByNickName))
  .patch('/:id', authJWT, wrap(userController.updateUserProfile))
  .delete('/:id', authJWT, wrap(userController.deleteUser))
  .post('/address', authJWT, wrap(userController.createUserAddress))
  .patch('/address/:id', authJWT, wrap(userController.updateUserAddress))
  .delete('/address/:id', authJWT, wrap(userController.deleteUserAddress))

export { userRouter }
