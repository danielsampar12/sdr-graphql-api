import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/inputs/create-user.input'
import { GraphQLError } from 'graphql'
import { compare, hash } from 'bcryptjs'
import { SaveUser, UsersRepository } from '@/repositories/user.repository'
import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
    private jwt: JwtService,
  ) {}

  async getRecentSDRUsers() {
    return await this.usersRepo.findManyRecent({ page: 1 })
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

  async delete(id: string): Promise<MutationSuccess> {
    await this.usersRepo.delete(id)

    return { message: `Deleted user with id: ${id}`, success: true }
  }

  async save(user: SaveUser, id: string): Promise<MutationSuccess> {
    await this.usersRepo.saveSDRUser(user, id)

    return { message: `Updated user with id: ${id}`, success: true }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findByEmail(email)

    if (!user) {
      throw new GraphQLError('Credentials do not match.', {
        extensions: { code: 400 },
      })
    }

    const isSamePassword = await compare(password, user.password)

    if (!isSamePassword) {
      throw new GraphQLError('Credentials do not match.', {
        extensions: { code: 400 },
      })
    }

    return this.jwt.sign({ sub: user.id })
  }
}
