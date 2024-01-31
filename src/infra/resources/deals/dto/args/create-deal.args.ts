import { Field, InputType } from '@nestjs/graphql'
import { CreateDealInput } from '../inputs/create-deal.input'

@InputType()
export class CreateDealArgs {
  @Field()
  deal: CreateDealInput
}
