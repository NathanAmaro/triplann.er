import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getParticipantDetailsSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"

export async function getParticipantDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId', getParticipantDetailsSchema, async (request) => {
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

        return { participant }

    })
}