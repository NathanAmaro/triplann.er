import {z} from 'zod'

// Schema do zod para validar as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    API_BASE_URL: z.string().url(),
    FRONT_BASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3333)
})

export const env = envSchema.parse(process.env)