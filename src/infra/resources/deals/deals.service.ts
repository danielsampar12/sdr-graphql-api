import { DealsRespository } from '@/repositories/deals.repository'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class DealsService {
  constructor(private dealsRepository: DealsRespository) {}

  async create(data: Prisma.DealUncheckedCreateInput) {
    return await this.dealsRepository.create(data)
  }

  async getAll() {
    return await this.dealsRepository.getAllDeals()
  }
}
