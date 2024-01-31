import { Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UsersService } from './users.service'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UsersService],
})
export class UsersModule {}
