import { Field, InputType } from '@nestjs/graphql'
import { CreateUserInput } from '../inputs/create-user.input'

@InputType()
export class CreateUserArgs {
  @Field()
  user: CreateUserInput
}
