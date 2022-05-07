// import axios from 'axios'
import { Router, Request, Response } from 'express'
import passport from 'passport'
import Container from 'typedi'
import { CLIENT_DOMAIN } from '../config'
import { wrap } from '../controller-wrapper'
import { Redis } from '../db'
import { BadReqError, UnauthorizedError } from '../http-error.class'
import { logger } from '../logger'
import { authJWT } from '../middlewares'
import { refresh, replaceErrors, sign } from '../utils'
import { AuthController } from './controllers'

const authController = Container.get(AuthController)
const redis = Container.get(Redis)
const authRouter = Router()

function setCookieAndRedirect() {
  return (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError()
    }

    const accessToken = sign(req.user)
    const refreshToken = refresh()
    redis.redisSet(String(req.user.id), refreshToken)

    res.cookie('x-auth-cookie', accessToken)
    res.cookie('x-auth-cookie-refresh', refreshToken)

    res.redirect(CLIENT_DOMAIN)
  }
}

authRouter
  .post('', wrap(authController.createVerification))
  .delete('/:id', authJWT, wrap(authController.verifyCode))

authRouter.get('/refresh', wrap(authController.refreshJWT))

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
)

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  setCookieAndRedirect()
)

authRouter.get('/kakao', passport.authenticate('kakao'))
authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
    session: false,
  }),
  setCookieAndRedirect()
)

authRouter.get('/logout', authJWT, async (req, res) => {
  //   const ACCESS_TOKEN = req.user?.accessToken
  //   if (ACCESS_TOKEN) {
  //     await axios({
  //       method: 'POST',
  //       url: 'https://kapi.kakao.com/v1/user/unlink',
  //       headers: {
  //         Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       },
  //     })
  //   }

  await req.session.destroy((err) => {
    if (err) {
      logger.info(JSON.stringify(err, replaceErrors))
      throw new BadReqError('session is not destroy')
    }

    logger.info(JSON.stringify(req.user, replaceErrors))
    req.logOut()
    res.redirect(CLIENT_DOMAIN)
  })
})

export { authRouter }
