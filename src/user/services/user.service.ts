import { Service } from 'typedi'
import { IUserService } from '..'
import { CreateUserDto } from '../dtos'
import { UserRepository } from '../repositories'

@Service()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data)
  }
}
