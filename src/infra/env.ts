import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  QUEUE_HOST: z.string(),
  QUEUE_PORT: z.string(),
  QUEUE_PASSWORD: z.string(),
})

export type Env = z.infer<typeof envSchema>
