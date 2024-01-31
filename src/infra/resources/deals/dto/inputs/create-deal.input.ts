import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateDealInput {
  @Field(() => String)
  companyName: string

  @Field(() => String)
  talkingTo: string

  @Field(() => String)
  responsibleId: string
}
