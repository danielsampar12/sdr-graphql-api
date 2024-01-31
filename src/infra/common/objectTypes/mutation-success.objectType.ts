import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MutationSuccess {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String)
  message: string
}
