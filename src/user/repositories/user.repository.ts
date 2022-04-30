/* eslint-disable camelcase */
import { plainToInstance } from 'class-transformer'
import { Service } from 'typedi'
import { DB } from '../../db'
import {
  CreateUserAddressDto,
  CreateUserAddressReturnDto,
  CreateUserDto,
  FindUserByNickNameDto,
  UpdatedUserReturnDto,
  UpdateUserAddressDto,
  UpdateUserAddressReturnDto,
  UpdateUserProfileDto,
} from '../dtos'
import { Address, User, UserProfile } from '../entities'

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
      .leftJoinAndSelect('user.address', 'address')
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

  async updateUserAddress(
    { id, userId }: { id: number; userId: number },
    { isDefault, ...data }: UpdateUserAddressDto
  ) {
    return this.dataSource.transaction(async (manager) => {
      const address = await manager
        .getRepository(Address)
        .createQueryBuilder()
        .update(Address)
        .set(data)
        .where('id = :id', { id })
        .returning(['id', 'userId', 'name', 'place', 'longitude', 'latitude'])
        .updateEntity(true)
        .execute()

      const result = plainToInstance(UpdateUserAddressReturnDto, address.raw[0])

      if (isDefault && userId === result.userId) {
        await manager
          .getRepository(User)
          .createQueryBuilder()
          .update(User)
          .set({ defaultAddressId: result.id })
          .where('id = :id', { id: userId })
          .execute()
      }

      return result
    })
  }

  async createUserAddress(
    userId: number,
    { isDefault, ...data }: CreateUserAddressDto
  ) {
    return this.dataSource.transaction(async (manager) => {
      const address = await manager
        .getRepository(Address)
        .createQueryBuilder()
        .insert()
        .into(Address)
        .values({ ...data, userId })
        .returning(['id', 'name', 'place', 'latitude', 'longitude'])
        .updateEntity(true)
        .execute()

      const result = plainToInstance(CreateUserAddressReturnDto, address.raw[0])
      if (isDefault) {
        await manager
          .getRepository(User)
          .createQueryBuilder()
          .update(User)
          .set({ defaultAddressId: result.id })
          .where('id = :id', { id: userId })
          .execute()
      }

      return result
    })
  }

  deleteUserAddress(id: number, userId: number) {
    return this.dataSource
      .getRepository(Address)
      .createQueryBuilder()
      .delete()
      .from(Address)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId })
      .execute()
    // return this.dataSource.getRepository(Address).delete(id)
  }

  deleteUser(id: number) {
    return this.userRespotiry.softDelete(id)
  }
}
