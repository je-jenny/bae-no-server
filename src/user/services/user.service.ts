import { Service } from 'typedi'
import { IUserService } from '..'
import {
  CreateUserAddressDto,
  CreateUserDto,
  FindUserByEmailDto,
  UpdateUserAddressDto,
  UpdateUserProfileDto,
} from '../dtos'
import { UserRepository } from '../repositories'

@Service()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data)
  }

  findUserById(id: number) {
    return this.userRepository.findUserById(id)
  }

  // TODO 미사용
  findUserByEmail({ email }: FindUserByEmailDto) {
    return this.userRepository.findUserByEmail(email)
  }

  findUserByNickName(nickname: string) {
    return this.userRepository.findUserByNickName(nickname)
  }

  updateUserProfile(id: number, data: UpdateUserProfileDto) {
    return this.userRepository.updateUserProfile(id, data)
  }

  updateUserAddress(
    ids: { id: number; userId: number },
    data: UpdateUserAddressDto
  ) {
    return this.userRepository.updateUserAddress(ids, data)
  }

  createUserAddress(id: number, data: CreateUserAddressDto) {
    return this.userRepository.createUserAddress(id, data)
  }

  deleteUserAddress(id: number, userId: number) {
    return this.userRepository.deleteUserAddress(id, userId)
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id)
  }
}
