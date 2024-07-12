import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getLinksSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'

export async function getLinks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', getLinksSchema, async (request) => {
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

        return {links: trip.links}

    })
}