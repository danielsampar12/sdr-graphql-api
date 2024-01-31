import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user.repository'
import { PaginationParams } from '@/interfaces/paginations-params'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findManyRecent(params: PaginationParams): Promise<User[]> {
    const perPage = 20

    return await this.prisma.user.findMany({
      take: perPage,
      skip: (params.page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async saveSDRUser(
    user: Prisma.UserUncheckedUpdateInput,
    id: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: user,
    })
  }

  async saveADMINUser(
    user: Prisma.UserUncheckedUpdateInput,
    id: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: user,
    })
  }

  async create(user: Prisma.UserUncheckedCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
