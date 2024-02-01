import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { IDeal } from '@/infra/common/interfaces/deal'

@Injectable()
export class FilesService {
  constructor(@InjectQueue('files') private filesQueue: Queue) {}

  async addDealFileJob(deal: IDeal) {
    await this.filesQueue.add({
      deal,
    })
  }
}
