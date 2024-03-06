import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { BullModule } from '@nestjs/bull'
import { FilessResolver } from './files.resolver'
import { FilesConsumer } from './files.consumer'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'files',
    }),
  ],
  providers: [FilessResolver, FilesConsumer, FilesService],
})
export class FilesModule {}
