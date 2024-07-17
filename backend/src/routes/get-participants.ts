import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import z from "zod"

export async function getParticipants(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/trips/:tripId/participants',
        schema: {
            description: 'Rota destinada a pegar uma lista de participantes da viagem',
            tags: ['Trip', 'Participant'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            response: {
                200: z.object({
                    participants: z.array(z.object({
                        id: z.string().uuid().describe('UUID do participante'),
                        is_confirmed: z.boolean().describe('Estado de confirmação do participante na viagem'),
                        name: z.string().nullable().describe('Nome do participante caso houver'),
                        email: z.string().email().describe('E-mail do participante'),
                    }))
                }),
                400: z.object({
                    message: z.string().describe('Mensagem de erro')
                })
            }
        },
        handler: async (request, reply) => {
            const { tripId } = request.params

            // Buscando a viagem com a id informada
            const trip = await prisma.trip.findUnique({
                where: {
                    id: tripId
                }, include: {
                    participants: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            is_confirmed: true
                        },
                        orderBy: {
                            email: 'asc'
                        }
                    }
                }
            })

            // Verificando se a busca foi bem sucedida
            if (!trip) {
                return reply.code(400).send({message: 'Trip not found.'})
            }

            return reply.code(200).send({ participants: trip.participants }) 
        }
    })
}