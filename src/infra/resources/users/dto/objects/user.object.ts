import { DealObject } from '@/infra/resources/deals/dto/objects/deal.objectType'
import { Field, ObjectType, OmitType, PartialType } from '@nestjs/graphql'

@ObjectType()
export class UserObject {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  createdAt: string

  @Field({ nullable: true })
  updatedAt: string

  @Field(() => [DealObject])
  deals: DealObject[]
}

@ObjectType()
export class UserResponse extends PartialType(
  OmitType(UserObject, ['password']),
) {}
