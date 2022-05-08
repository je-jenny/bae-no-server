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

const ACCESS_TOKEN_COOKIE = 'x-auth-cookie'
const REFRESH_TOKEN_COOKIE = 'x-auth-cookie-refresh'

function setCookieAndRedirect() {
  return (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError()
    }

    const accessToken = sign(req.user)
    const refreshToken = refresh()
    redis.redisSet(String(req.user.id), refreshToken)

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken)
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken)

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

    logger.info(`${req.id} is logged out.`)
    // logger.info(JSON.stringify(req.id, replaceErrors))
    req.logOut()
    res.clearCookie(ACCESS_TOKEN_COOKIE)
    res.clearCookie(REFRESH_TOKEN_COOKIE)

    res.redirect(CLIENT_DOMAIN)
  })
})

export { authRouter }
