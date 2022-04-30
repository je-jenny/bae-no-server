import axios from 'axios'
import { Router } from 'express'
import passport from 'passport'
import Container from 'typedi'
import { wrap } from '../controller-wrapper'
import { BadReqError } from '../http-error.class'
import { logger } from '../logger'
import { isAuthenticate, isUnAuthenticate } from '../middlewares'
import { replaceErrors } from '../utils'
import { AuthController } from './controllers'

const authController = Container.get(AuthController)
const authRouter = Router()

authRouter
  .post('', wrap(authController.createVerification))
  .delete('/:id', isAuthenticate, wrap(authController.verifyCode))

authRouter.get(
  '/google',
  isUnAuthenticate,
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

authRouter.get('/kakao', isUnAuthenticate, passport.authenticate('kakao'))
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (_, res) => {
    res.redirect('/')
  }
)

authRouter.get('/logout', isAuthenticate, async (req, res) => {
  const ACCESS_TOKEN = req.user?.accessToken
  if (ACCESS_TOKEN) {
    await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  }

  await req.session.destroy((err) => {
    if (err) {
      logger.info(JSON.stringify(err, replaceErrors))
      throw new BadReqError('session is not destroy')
    }

    logger.info(JSON.stringify(req.user, replaceErrors))
    req.logOut()
    res.redirect('/')
  })
})

export { authRouter }
