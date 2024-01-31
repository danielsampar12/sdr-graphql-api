import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/inputs/create-user.input'
import { GraphQLError } from 'graphql'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/user.repository'
import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async getRecentSDRUsers() {
    return await this.usersRepo.findManyRecent({ page: 1 })
  }

  async delete(id: string): Promise<MutationSuccess> {
    await this.usersRepo.delete(id)

    return { message: `Deleted user with id: ${id}`, success: true }
  }

  async createSDRUser(user: CreateUserInput) {
    const existingUser = await this.usersRepo.findByEmail(user.email)

    if (existingUser) {
      throw new GraphQLError('User with same email already exists.', {
        extensions: { code: 400 },
      })
    }

    return await this.usersRepo.create({
      ...user,
      role: 'SDR',
      password: await hash(user.password, 8),
    })
  }
}
