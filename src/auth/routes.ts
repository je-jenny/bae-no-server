import { Router } from 'express'
import passport from 'passport'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { isAuthenticate } from '../middlewares'
import { AuthController } from './controllers'

const authController = Container.get(AuthController)
const authRouter = Router()

authRouter
  .post('', wrap(authController.createVerification))
  .delete('/:id', isAuthenticate, wrap(authController.verifyCode))

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (_, res) => {
    res.redirect('/')
  }
)

authRouter.get('/kakao', passport.authenticate('kakao'))
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (_, res) => {
    res.redirect('/')
  }
)

export { authRouter }
