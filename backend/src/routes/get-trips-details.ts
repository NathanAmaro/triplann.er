import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import z from "zod"

export async function getTripDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/trips/:tripId',
        schema: {
            description: 'Rota destinada a pegar os dados da viagem',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            response: {
                200: z.object({
                    id: z.string().uuid().describe('UUID da viagem'),
                    sequence: z.number().describe('Número sequencial da viagem'),
                    destination: z.string().describe('Destino da viagem'),
                    starts_at: z.coerce.date().describe('Data do início da viagem'),
                    ends_at: z.coerce.date().describe('Data do fim da viagem'),
                    is_confirmed: z.boolean().describe('Estado de confirmação da viagem'),
                }).describe('Success'),
                400: z.object({
                    message: z.string().describe('Mensagem de erro')
                }).describe('Error')
            }
        },
        handler: async (request, reply) => {
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
                return reply.code(400).send({message: 'Trip not found.'})
            }

            return reply.code(200).send(trip)
        }
    })
}