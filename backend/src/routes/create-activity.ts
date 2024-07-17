import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import { dayjs } from '../lib/dayjs-locale'
import z from "zod"

export async function createActivity(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/trips/:tripId/activities',
        schema: {
            description: 'Rota destinada a cadastrar uma nova atividade para a viagem',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid().describe('UUID da viagem')
            }),
            body: z.object({
                title: z.string().min(4).describe('Título da atividade'),
                occurs_at: z.coerce.date().describe('Data que a atividade irá ocorrer')
            }),
            response: {
                200: z.object({
                    activityId: z.string().uuid().describe('UUID da atividade cadastrada')
                }),
                400: z.object({
                    message: z.string().describe('Mensagem de erro')
                })
            }
        },
        handler: async (request, reply) => {
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
                return reply.code(400).send({message: 'Trip not found.'})
            }

            // Verificando se a data da atividade está anterior a data do início da viagem
            if (dayjs(occurs_at).isBefore(trip.starts_at)) {
                return reply.code(400).send({message: 'Invalid starts date to activity.'})
            }

            // Verificando se a data da atividade está posterior a data do fim da viagem
            if (dayjs(occurs_at).isAfter(trip.ends_at)) {
                return reply.code(400).send({message: 'Invalid ends date to activity.'})
            }

            // Cadastrando a atividade
            const activity = await prisma.activity.create({
                data: {
                    title: title,
                    occurs_at: occurs_at,
                    trip_id: tripId
                }
            })

            return reply.code(200).send({ activityId: activity.id }) 
        }
    })
}