import { Service } from 'typedi'
import { DB } from '../../db'
import { CreateUserDto } from '../dtos'
import { User, UserProfile } from '../entities'

@Service()
export class UserRepository {
  userRespotiry

  constructor(private readonly db: DB) {
    this.userRespotiry = this.db.AppdataSource.getRepository(User)
  }

  createUser({ email, nickname, provider }: CreateUserDto) {
    const profile = new UserProfile()
    profile.nickname = nickname
    profile.provider = provider
    const user = new User()
    user.email = email
    user.profile = profile
    return this.userRespotiry.save(user)
  }
}
