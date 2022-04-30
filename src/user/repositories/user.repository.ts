import { plainToInstance } from 'class-transformer'
import { Service } from 'typedi'
import { DB } from '../../db'
import {
  CreateUserDto,
  FindUserByNickNameDto,
  UpdatedUserLongLatiReturnDto,
  UpdatedUserReturnDto,
  UpdateUserProfileDto,
} from '../dtos'
import { User, UserProfile } from '../entities'

@Service()
export class UserRepository {
  private userRespotiry

  private userProfileRespotiry

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

  async findUserByNickName(nickname: string) {
    const result = await this.userProfileRespotiry
      .createQueryBuilder('profile')
      .select(['profile.nickname'])
      .where('profile.nickname = :nickname', { nickname })
      .getOne()

    return plainToInstance(FindUserByNickNameDto, result)
  }

  findUserByEmail(email: string) {
    return this.userRespotiry
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()
  }

  async updateUserProfile(userId: number, data: UpdateUserProfileDto) {
    const result = await this.userProfileRespotiry
      .createQueryBuilder()
      .update(UserProfile)
      .set(data)
      .where('userId = :userId', { userId })
      .returning(['id', 'nickname', 'phone_number'])
      .updateEntity(true)
      .execute()

    return plainToInstance(UpdatedUserReturnDto, result.raw[0])
  }

  async updateUserProfileCoordinate(
    userId: number,
    data: { longitude: number; latitude: number }
  ) {
    const result = await this.userProfileRespotiry
      .createQueryBuilder()
      .update(UserProfile)
      .set(data)
      .where('userId = :userId', { userId })
      .returning(['id', 'longitude', 'latitude'])
      .updateEntity(true)
      .execute()

    return plainToInstance(UpdatedUserLongLatiReturnDto, result.raw[0])
  }

  deleteUser(id: number) {
    return this.userRespotiry.softDelete(id)
  }
}
