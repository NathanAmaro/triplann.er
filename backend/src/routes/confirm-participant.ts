import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import { env } from "../env"
import z from "zod"

export async function confirmParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/participants/:participantId/confirm',
        schema: {
            description: 'Rota destinada a confirmar o convidado na viagem',
            tags: ['Participant'],
            params: z.object({
                participantId: z.string().uuid().describe('UUID do participante')
            }),
            response: {
                200: z.string().url().describe('Redirecionamento automático para a página da viagem')
            }
        },
        handler: async (request, reply) => {
            const { participantId } = request.params

            // Consultando o participante com a id informada
            const participant = await prisma.participant.findUnique({
                where: {
                    id: participantId
                }
            })

            // Verificando se a consulta não obteu um resultado
            if (!participant) {
                throw new Error('Participant not found.')
            }

            // Verificando se o participante já foi confirmado anteriormente
            if (participant.is_confirmed) {
                // Redirecionando automaticamente o usuário para a link do front-end
                return reply.redirect(`${env.FRONT_BASE_URL}/trips/${participant.trip_id}`)
            }

            // Alterando a viagem e setando como confirmada
            await prisma.participant.update({
                where: {
                    id: participantId
                },
                data: {
                    is_confirmed: true
                }
            })

            // Redirecionando automaticamente o usuário para a link do front-end
            return reply.code(200).redirect(`${env.FRONT_BASE_URL}/trips/${participant.trip_id}`)
        }
    })
}