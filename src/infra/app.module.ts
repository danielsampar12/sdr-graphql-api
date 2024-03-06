import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env, envSchema } from './env'

import { join } from 'path'
import { UsersModule } from './resources/users/users.module'
import { DealsModule } from './resources/deals/deals.module'
import { AuthModule } from './auth/auth.module'
import { BullModule } from '@nestjs/bull'
import { FilesModule } from './resources/files/files.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => {
        return {
          redis: {
            host: configService.get('QUEUE_HOST'),
            port: configService.get('QUEUE_PORT'),
            password: configService.get('QUEUE_PASSWORD'),
          },
        }
      },
    }),
    UsersModule,
    DealsModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
