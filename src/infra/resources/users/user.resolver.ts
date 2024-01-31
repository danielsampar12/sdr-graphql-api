import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserObject, UserResponse } from './dto/objects/user.object'
import { CreateUserArgs } from './dto/args/create-user.args'
import { UsersService } from '@/infra/resources/users/users.service'

@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserObject])
  async users() {
    return await this.usersService.getRecentSDRUsers()
  }

  @Mutation(() => UserResponse)
  async createSDRUser(@Args('data') args: CreateUserArgs) {
    const { id, email, name, createdAt, updatedAt } =
      await this.usersService.createSDRUser(args.user)

    return {
      id,
      email,
      name,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }
  }

  @Mutation(() => String)
  deleteUser() {
    return 'Usuário criado'
  }
}
