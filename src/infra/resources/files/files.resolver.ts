import { MutationSuccess } from '@/infra/common/objectTypes/mutation-success.objectType'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FilesService } from './files.service'
import { CreateDealArgs } from '../deals/dto/args/create-deal.args'

@Resolver()
export class FilessResolver {
  constructor(private filesService: FilesService) {}

  @Mutation(() => MutationSuccess)
  async createFileJob(@Args('data') args: CreateDealArgs) {
    await this.filesService.addDealFileJob({
      ...args.deal,
      id: '9fad379a-c0d8-45f9-a7f3-0ae484351f89',
    })

    return { message: 'Created deal job', success: true }
  }
}
