import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getActivitiesSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'

export async function getActivities(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/activities', getActivitiesSchema, async (request) => {
        const { tripId } = request.params

        // Buscando a viagem com a id informada
        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }, include: {
                activities: {
                    orderBy: {
                        occurs_at: 'asc'
                    }
                }
            }
        })

        // Verificando se a busca foi bem sucedida
        if (!trip) {
            throw new Error('Trip not found.')
        }

        // Verificando a diferença em dias "days" entre a data de fim e a data de início da viagem
        const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(trip.starts_at, 'days')

        // Variável que cria um Array com o tamanho igual a quantidade de dias de diferença entre o fim e o início da viagem. O +1 serve para considerar o dia inicial da viagem.
        // Realizando um map neste array para percorrer os dias calculados.
        const activities = Array.from({ length: differenceInDaysBetweenTripStartAndEnd + 1 }).map((_, index) => {
            // Adicionando a quantidade de dias na data de início e retornando a data inteira.
            const date = dayjs(trip.starts_at).add(index, 'days')

            return {
                date: date.toDate(),
                // Filtrando a lista retornada da consulta no banco de dados
                activities: trip.activities.filter((activity) => {
                    // Retornando a atividade que possuir a data "occurs_at" igual a data atual
                    return dayjs(activity.occurs_at).isSame(date, 'day')
                })
            }
        })

        return { activities: activities }

    })
}