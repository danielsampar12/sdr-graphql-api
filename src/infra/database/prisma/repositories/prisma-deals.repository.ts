import { MigrationSucess } from '@/interfaces/migration-success'
import { DealsRespository } from '@/repositories/deals.repository'
import { Injectable } from '@nestjs/common'
import { Deal, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDealsRepository implements DealsRespository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllDeals(): Promise<Deal[]> {
    return await this.prisma.deal.findMany({ include: { responsible: true } })
  }

  async create(
    data: Prisma.DealUncheckedCreateInput,
  ): Promise<MigrationSucess> {
    await this.prisma.deal.create({ data })

    return { message: 'Created deal', success: true }
  }
}
