import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import z from "zod"

export async function getLinks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/trips/:tripId/links',
        schema: {
            description: 'Rota destinada a pegar a lista de links vinculados a viagem',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            response: {
                200: z.object({
                    links: z.array(z.object({
                        id: z.string(),
                        title: z.string(),
                        url: z.string(),
                        trip_id: z.string()
                    }))
                }).describe('Resposta padrão')
            }
        },
        handler: async (request, reply) => {
            const { tripId } = request.params

            // Buscando a viagem com a id informada
            const trip = await prisma.trip.findUnique({
                where: {
                    id: tripId
                }, include: {
                    links: {
                        orderBy: {
                            title: 'asc'
                        }
                    }
                }
            })

            // Verificando se a busca foi bem sucedida
            if (!trip) {
                throw new Error('Trip not found.')
            }

            return reply.code(200).send({ links: trip.links })
        }
    })
}