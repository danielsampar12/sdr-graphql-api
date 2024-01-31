import { MigrationSucess } from '@/interfaces/migration-success'
import { Prisma } from '@prisma/client'

export abstract class DealsRespository {
  abstract create(
    data: Prisma.DealUncheckedCreateInput,
  ): Promise<MigrationSucess>
}
