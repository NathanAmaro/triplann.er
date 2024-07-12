import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { updateTripSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'

export async function updateTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId', updateTripSchema, async (request) => {
        const { tripId } = request.params
        const { destination, ends_at, starts_at } = request.body

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

        // Verificando se a data de início é anterior a data atual
        if (dayjs(starts_at).isBefore(new Date())) {
            throw new Error('Invalid trip start date.')
        }

        // Verificando se a data de fim é anterior a data de início
        if (dayjs(ends_at).isBefore(starts_at)) {
            throw new Error('Invalid trip end date.')
        }

        // Alterando os dados da viagem
        const updatedTrip = await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                destination: destination,
                ends_at: ends_at,
                starts_at: starts_at
            }
        })

        return { tripId: updatedTrip.id }

    })
}