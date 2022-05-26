/* eslint-disable camelcase */
import passport from 'passport'
import { Strategy as KakaoStrategy } from 'passport-kakao'
import Container from 'typedi'
import { KAKAO_CONFIG } from '../config'
import { NotFoundError } from '../http-error.class'
import { PROFILE_PROVIDER, UserService } from '../user'

export default () => {
  const userService = Container.get(UserService)
  passport.use(
    new KakaoStrategy(
      { ...KAKAO_CONFIG },
      async (accessToken, _refreshToken, profile, cb) => {
        // eslint-disable-next-line no-underscore-dangle
        const { email } = profile._json.kakao_account
        if (!email) {
          return cb(
            new NotFoundError('You must agree to use your Kakao account email')
          )
        }
        const user = await userService.findUserByEmail({ email })

        if (!user) {
          const createdUser = await userService.createUser({
            email,
            provider: PROFILE_PROVIDER.KAKAO,
          })
          return cb(null, { ...createdUser, accessToken })
        }
        return cb(null, { ...user, accessToken })
      }
    )
  )
}
