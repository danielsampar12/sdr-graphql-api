import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/inputs/create-user.input'
import { GraphQLError } from 'graphql'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/user.repository'

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async createUser(user: CreateUserInput) {
    const existingUser = await this.usersRepo.findByEmail(user.email)

    if (existingUser) {
      throw new GraphQLError('User with same email already exists.', {
        extensions: { code: 400 },
      })
    }

    return await this.usersRepo.create({
      ...user,
      password: await hash(user.password, 8),
    })
  }
}
