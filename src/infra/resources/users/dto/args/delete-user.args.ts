import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteUserArgs {
  @Field()
  id: string
}
