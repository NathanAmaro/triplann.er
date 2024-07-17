import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import z from "zod"

export async function getParticipantDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/participants/:participantId',
        schema: {
            description: 'Rota destinada a pegar detalhes de um participante',
            tags: ['Participant'],
            params: z.object({
                participantId: z.string().uuid().describe('UUID do participante')
            }),
            response: {
                200: z.object({
                    id: z.string().uuid().describe('UUID do participante'),
                    name: z.string().nullable().describe('Nome do participante caso houver'),
                    email: z.string().email().describe('E-mail do participante'),
                    is_confirmed: z.boolean().describe('Estado de confirmação de presença do participante'),
                })
            }
        },
        handler: async (request, reply) => {
            const { participantId } = request.params

            // Buscando o participant com a id informada
            const participant = await prisma.participant.findUnique({
                where: {
                    id: participantId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    is_confirmed: true
                }
            })

            // Verificando se a busca foi bem sucedida
            if (!participant) {
                throw new Error('Participant not found.')
            }

            return reply.code(200).send(participant)
        }
    })
}