import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createLinkSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"

export async function createLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/links', createLinkSchema, async (request) => {
        const { tripId } = request.params
        const { url, title } = request.body

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

        // Cadastrando o link
        const link = await prisma.link.create({
            data: {
                title: title,
                url: url,
                trip_id: tripId
            }
        })

        return { linkId: link.id }

    })
}