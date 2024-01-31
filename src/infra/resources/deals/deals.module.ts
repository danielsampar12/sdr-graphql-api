import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { DealsResolver } from './deals.resolver'
import { DealsService } from './deals.service'

@Module({
  imports: [DatabaseModule],
  providers: [DealsResolver, DealsService],
})
export class DealsModule {}
