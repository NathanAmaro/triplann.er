import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createActivitySchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'

export async function createActivity(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/activities', createActivitySchema, async (request) => {
        const { tripId } = request.params
        const { occurs_at, title } = request.body

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

        // Verificando se a data da atividade está anterior a data do início da viagem
        if (dayjs(occurs_at).isBefore(trip.starts_at)) {
            throw new Error('Invalid activity date.')
        }

        // Verificando se a data da atividade está posterior a data do fim da viagem
        if (dayjs(occurs_at).isAfter(trip.ends_at)) {
            throw new Error('Invalid activity date.')
        }

        // Cadastrando a atividade
        const activity = await prisma.activity.create({
            data: {
                title: title,
                occurs_at: occurs_at,
                trip_id: tripId
            }
        })

        return { activityId: activity.id }

    })
}