import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository'
import { UsersRepository } from '@/repositories/user.repository'
import { DealsRespository } from '@/repositories/deals.repository'
import { PrismaDealsRepository } from './prisma/repositories/prisma-deals.repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: DealsRespository, useClass: PrismaDealsRepository },
  ],
  exports: [PrismaService, UsersRepository, DealsRespository],
})
export class DatabaseModule {}
