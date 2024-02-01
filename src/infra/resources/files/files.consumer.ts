import { IDeal } from '@/infra/common/interfaces/deal'
import { Processor, Process, OnQueueActive } from '@nestjs/bull'
import { Job } from 'bull'
import { promisify } from 'util'

import { parse } from 'json2csv'
import { writeFile as fsWriteFile } from 'fs'
import { join } from 'path'

@Processor('files')
export class FilesConsumer {
  @Process()
  async transcode(job: Job<{ deal: IDeal }>) {
    try {
      let progress = 0
      for (let i = 0; i < 100; i++) {
        const writeFile = promisify(fsWriteFile)

        console.log(job.data.deal)

        const data = parse(job.data.deal)

        await writeFile(
          join(process.cwd(), 'assets/temp/idk.txt'),
          data,
          'utf8',
        )

        progress += 1
        await job.progress(progress)
      }
      return {}
    } catch (error) {
      console.log({ transcodeError: error })
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }
}
