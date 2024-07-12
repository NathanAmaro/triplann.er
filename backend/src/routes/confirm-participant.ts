import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import { confirmParticipantSchema } from "../lib/zod-schemas"
import { env } from "../env"

export async function confirmParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', confirmParticipantSchema, async (request, reply) => {
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
        return reply.redirect(`${env.FRONT_BASE_URL}/trips/${participant.trip_id}`)

    })
}