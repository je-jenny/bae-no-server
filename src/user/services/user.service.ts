import { Service } from 'typedi'
import { IUserService } from '..'
import {
  CreateUserDto,
  FindUserByEmailDto,
  FindUserByNickNameDto,
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

  findUserByNickName({ nickname }: FindUserByNickNameDto) {
    return this.userRepository.findUserByNickName(nickname)
  }

  updateUserProfile(id: number, data: UpdateUserProfileDto) {
    return this.userRepository.updateUserProfile(id, data)
  }

  updateUserProfileCoordinate(
    id: number,
    data: { longitude: number; latitude: number }
  ) {
    return this.userRepository.updateUserProfileCoordinate(id, data)
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id)
  }
}
