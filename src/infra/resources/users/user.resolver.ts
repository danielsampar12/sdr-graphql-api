import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserObject, UserResponse } from './dto/objects/user.object'
import { CreateUserArgs } from './dto/args/create-user.args'
import { UsersService } from '@/infra/resources/users/users.service'
import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'
import { DeleteUserArgs } from './dto/args/delete-user.args'
import { SaveUserArgs } from './dto/args/save-user.args'

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

  @Mutation(() => MutationSuccess)
  async deleteUser(@Args('user') args: DeleteUserArgs) {
    return await this.usersService.delete(args.id)
  }

  @Mutation(() => MutationSuccess)
  async saveUser(@Args('data') args: SaveUserArgs) {
    return await this.usersService.save(args.user, args.id)
  }
}
