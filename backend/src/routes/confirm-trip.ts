import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma"
import { dayjs } from "../lib/dayjs-locale"
import { getMailClient } from "../lib/email"
import { env } from "../env"
import nodemailer from 'nodemailer'
import z from "zod"

export async function confirmTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/trips/:tripId/confirm',
        schema: {
            description: 'Rota destinada a confirmar a viagem após ser cadastrada',
            tags: ['Trip'],
            params: z.object({
                tripId: z.string().uuid()
            }),
            response: {
                400: z.object({
                    message: z.string().describe('Mensagem de erro')
                })
            }
        },
        handler: async (request, reply) => {
            const { tripId } = request.params

            // Consultando uma viagem com a id informada
            const trip = await prisma.trip.findUnique({
                where: {
                    id: tripId
                }
            })

            // Verificando se a consulta não obteu um resultado
            if (!trip) {
                return reply.code(400).send({message: 'Trip not found.'})
            }

            // Verificando se a viagem já foi confirmada anteriormente
            if (trip.is_confirmed) {
                // Redirecionando automaticamente o usuário para a link do front-end
                return reply.redirect(`${env.API_BASE_URL}/trips/${tripId}`)
            }

            // Alterando a viagem e setando como confirmada
            await prisma.trip.update({
                where: {
                    id: tripId
                },
                data: {
                    is_confirmed: true
                }
            })

            // Buscando os participantes da viagem que não estão confirmados ainda
            const tripParticipants = await prisma.participant.findMany({
                where: {
                    trip_id: tripId,
                    is_owner: false,
                    is_confirmed: false
                }
            })

            // Formatando as datas
            const formattedStartDate = dayjs(trip.starts_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')
            const formattedEndtDate = dayjs(trip.ends_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')

            // Configurando o envio de email
            const mail = await getMailClient()

            // Realizando uma promise para todos os participantes
            await Promise.all(
                tripParticipants.map(async (participant) => {
                    // Gerando link de confirmação da viagem
                    const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

                    // Configurando o email para o participante
                    const message = await mail.sendMail({
                        from: {
                            name: 'Equipe plann.er',
                            address: 'suport@plann.er'
                        },
                        to: participant.email,
                        subject: `Confirmação de presença na viagem para ${trip.destination} em ${formattedStartDate}`,
                        html: `
                        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                            <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}, Brasil</strong> nas data de <strong>${formattedStartDate} até ${formattedEndtDate}</strong>.</p>
                            <br>
                            <p>Para confirmar sua viagem, clique no link abaixo:</p>
                            <br>
                            <p>
                                <a href="${confirmationLink}" target="_blank">
                                    Confirmar viagem
                                </a>
                            </p>
                            <br>
                            <p>Caso você não saida do que se trata esse e-mail, apenas ignora esse e-mail.</p>
                        </div>
                    `.trim()
                    })

                    console.log(nodemailer.getTestMessageUrl(message))
                })
            )

            // Redirecionando automaticamente o usuário para a link do front-end
            return reply.redirect(`${env.FRONT_BASE_URL}/trips/${tripId}`)
        }
    })
}