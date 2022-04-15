import { Service } from 'typedi'
import { CreateUser } from '..'
import { DB } from '../../db'
import { User, UserProfile } from '../entities'

@Service()
export class UserRepository {
  userRespotiry

  constructor(private readonly db: DB) {
    this.userRespotiry = this.db.AppdataSource.getRepository(User)
  }

  createUser({ user: { email }, profile: { nickname, provider } }: CreateUser) {
    const profile = new UserProfile()
    profile.nickname = nickname
    profile.provider = provider
    const user = new User()
    user.email = email
    user.profile = profile
    return this.userRespotiry.save(user)
  }
}
