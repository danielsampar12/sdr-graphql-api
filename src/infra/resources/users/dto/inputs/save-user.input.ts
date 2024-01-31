import { Field, InputType } from '@nestjs/graphql'
import { UserObject } from '../objects/user.object'

@InputType()
export class SaveUserInput implements Partial<UserObject> {
  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  password?: string
}
