import { PaginationParams } from '@/interfaces/paginations-params'
import { Prisma, User } from '@prisma/client'

export type SaveUser = Prisma.UserUncheckedUpdateInput

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findManyRecent(params: PaginationParams): Promise<User[]>
  abstract saveSDRUser(user: SaveUser, id: string): Promise<void>

  abstract saveADMINUser(user: SaveUser, id: string): Promise<void>

  abstract create(user: Prisma.UserUncheckedCreateInput): Promise<User>
  abstract delete(id: string): Promise<void>
}
