import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateDealArgs } from './dto/args/create-deal.args'
import { DealsService } from './deals.service'
import { DealObject } from './dto/objects/deal.objectType'

@Resolver()
export class DealsResolver {
  constructor(private dealsService: DealsService) {}

  @Query(() => [DealObject])
  async deals() {
    return await this.dealsService.getAll()
  }

  @Mutation(() => MutationSuccess)
  async createDeal(@Args('data') args: CreateDealArgs) {
    return await this.dealsService.create(args.deal)
  }
}
