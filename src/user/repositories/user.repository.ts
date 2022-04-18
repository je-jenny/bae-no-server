import { Service } from 'typedi'
import { DB } from '../../db'
import { CreateUserDto, UpdateUserProfileDto } from '../dtos'
import { User, UserProfile } from '../entities'

@Service()
export class UserRepository {
  userRespotiry

  userProfileRespotiry

  private dataSource

  constructor(private readonly db: DB) {
    this.userRespotiry = this.db.AppdataSource.getRepository(User)
    this.userProfileRespotiry = this.db.AppdataSource.getRepository(UserProfile)
    this.dataSource = this.db.AppdataSource
  }

  createUser({ email, provider }: CreateUserDto) {
    const profile = new UserProfile()
    profile.provider = provider
    const user = new User()
    user.email = email
    user.profile = profile
    return this.userRespotiry.save(user)
  }

  findUserById(id: number) {
    return this.userRespotiry
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne()
  }

  findUserByEmail(email: string) {
    return this.userRespotiry
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()
  }

  updateUserProfile(userId: number, data: UpdateUserProfileDto) {
    return this.userProfileRespotiry
      .createQueryBuilder()
      .update(UserProfile)
      .set(data)
      .where('userId = :userId', { userId })
      .execute()
  }

  deleteUser(id: number) {
    return this.userRespotiry.softDelete(id)
  }
}
