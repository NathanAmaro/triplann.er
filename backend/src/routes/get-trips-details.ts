import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getTripDetailsSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error-400"

export async function getTripDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId', getTripDetailsSchema, async (request) => {
        const { tripId } = request.params

        // Buscando a viagem com a id informada
        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            select: {
                id: true,
                destination: true,
                starts_at: true,
                ends_at: true,
                sequence: true,
                is_confirmed: true
            }
        })

        // Verificando se a busca foi bem sucedida
        if (!trip) {
            throw new ClientError('Trip not found.')
        }

        return { trip }
    })
}