import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Container from 'typedi'
import { GOOGLE_CONFIG } from '../config'
import { NotFoundError } from '../http-error.class'
import { PROFILE_PROVIDER } from '../user'
import { UserService } from '../user/services'

export default () => {
  const userService = Container.get(UserService)
  passport.use(
    new GoogleStrategy(
      {
        ...GOOGLE_CONFIG,
      },
      async (_accessToken, _refreshToken, profile, cb) => {
        // eslint-disable-next-line no-underscore-dangle
        const { email } = profile._json
        if (!email) {
          return cb(new NotFoundError('Not Found Email'))
        }

        const user = await userService.findUserByEmail({ email })

        if (!user) {
          const createdUser = await userService.createUser({
            email,
            provider: PROFILE_PROVIDER.GOOGLE,
          })

          return cb(null, createdUser)
        }

        return cb(null, user)
      }
    )
  )
}
