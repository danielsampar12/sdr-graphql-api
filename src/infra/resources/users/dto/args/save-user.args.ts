import { Field, InputType } from '@nestjs/graphql'
import { SaveUserInput } from '../inputs/save-user.input'

@InputType()
export class SaveUserArgs {
  @Field()
  user: SaveUserInput

  @Field()
  id: string
}
