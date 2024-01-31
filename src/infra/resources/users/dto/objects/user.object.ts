import { Field, ObjectType, OmitType, PartialType } from '@nestjs/graphql'

@ObjectType()
export class UserObject {
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
}

@ObjectType()
export class UserResponse extends PartialType(
  OmitType(UserObject, ['password']),
) {}
