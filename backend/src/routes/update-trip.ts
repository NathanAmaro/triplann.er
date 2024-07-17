import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { updateTripSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'
import z from "zod"

export async function updateTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'PUT',
        url: '/trips/:tripId',
        schema: {
            description: 'Rota destinada a alterar dados da viagem',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            body: z.object({
                destination: z.string().min(4).describe('Destino da viagem'),
                starts_at: z.coerce.date().describe('Data de início da viagem'),
                ends_at: z.coerce.date().describe('Data de fim da viagem')
            }),
            response: {
                200: z.object({
                    tripId: z.string().uuid().describe('UUID da viagem')
                })
            }
        },
        handler: async (request, reply) => {
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

            return reply.code(200).send({ tripId: updatedTrip.id }) 
        }
    })
}