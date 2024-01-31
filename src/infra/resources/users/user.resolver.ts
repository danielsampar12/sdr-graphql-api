import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserResponse } from './dto/objects/user.object'
import { CreateUserArgs } from './dto/args/create-user.args'
import { UsersService } from '@/infra/resources/users/users.service'

@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  users() {
    return 'Hello world'
  }

  @Mutation(() => UserResponse)
  async createUser(@Args('createUserArgs') args: CreateUserArgs) {
    const { id, email, name, createdAt, updatedAt } =
      await this.usersService.createUser(args.data)

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
