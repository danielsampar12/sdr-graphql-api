import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateDealArgs } from './dto/args/create-deal.args'
import { DealsService } from './deals.service'

@Resolver()
export class DealsResolver {
  constructor(private dealsService: DealsService) {}

  @Mutation(() => MutationSuccess)
  async createDeal(@Args('data') args: CreateDealArgs) {
    return await this.dealsService.createDeal(args.deal)
  }
}
