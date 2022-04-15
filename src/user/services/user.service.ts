/* eslint-disable no-useless-constructor */
import { Service } from 'typedi'
import { CreateUser, IUserService } from '..'
import { UserRepository } from '../repositories'

@Service()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(data: CreateUser) {
    return this.userRepository.createUser(data)
  }
}
