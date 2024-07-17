import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import z from "zod"

export async function createLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/trips/:tripId/links',
        schema: {
            description: 'Rota destinada a cadastrar um link na viagem',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            body: z.object({
                title: z.string().min(4).describe('Título do link'),
                url: z.string().url().describe('URL')
            }),
            response: {
                200: z.object({
                    linkId: z.string().uuid().describe('UUID do link')
                })
            }
        },
        handler: async (request, reply) => {
            const { tripId } = request.params
            const { url, title } = request.body

            // Buscando a viagem com a id informada
            const trip = await prisma.trip.findUnique({
                where: {
                    id: tripId
                }
            })

            // Verificando se a busca foi bem sucedida
            if (!trip) {
                throw new Error('Trip not found.')
            }

            // Cadastrando o link
            const link = await prisma.link.create({
                data: {
                    title: title,
                    url: url,
                    trip_id: tripId
                }
            })

            return reply.code(200).send({ linkId: link.id })
        }
    })
}