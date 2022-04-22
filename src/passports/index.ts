import passport from 'passport'
import { User } from '../user'
import google from './google-strategy'

export default () => {
  passport.serializeUser((user: User, done) => {
    return done(null, user)
  })
  passport.deserializeUser(async (user: User, done) => {
    try {
      return done(null, user) // req.user
    } catch (error) {
      return done(error)
    }
  })

  google()
}
