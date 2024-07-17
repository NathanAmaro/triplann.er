import {z} from 'zod'

// Schema do zod para validar as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url().describe('postgresql://planner:123@localhost:5432/plannerdb?schema=public'),
    API_BASE_URL: z.string().url().describe('http://localhost:3333'),
    FRONT_BASE_URL: z.string().url().describe('http://localhost:3000'),
    PORT: z.coerce.number().default(3333).describe('3333')
})

export const env = envSchema.parse(process.env)