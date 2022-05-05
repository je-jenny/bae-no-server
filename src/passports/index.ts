import passport from 'passport'
import { User } from '../user'
import google from './google-strategy'
import kakao from './kakao-strategy'

export default () => {
  passport.serializeUser((user: User, done) => {
    return done(null, user)
  })
  passport.deserializeUser(async (user: User, done) => {
    if (!user) {
      return done(new Error())
    }
    return done(null, user)
    // try {
    //   return done(null, user) // req.user
    // } catch (error) {
    //   return done(error)
    // }
  })

  google()
  kakao()
}
