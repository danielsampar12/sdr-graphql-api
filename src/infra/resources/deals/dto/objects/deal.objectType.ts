import { UserObject } from '@/infra/resources/users/dto/objects/user.object'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DealObject {
  @Field(() => String)
  id: string

  @Field(() => String)
  companyName: string

  @Field(() => String)
  talkingTo: string

  @Field(() => String)
  createdAt: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field(() => UserObject)
  responsible: UserObject

  @Field(() => String)
  responsibleId: string
}
