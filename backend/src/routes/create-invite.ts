import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createInviteSchema } from "../lib/zod-schemas"
import { prisma } from "../lib/prisma"
import { getMailClient } from "../lib/email"
import nodemailer from 'nodemailer'
import { dayjs } from '../lib/dayjs-locale'
import { env } from "../env"

export async function createInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/invites', createInviteSchema, async (request) => {
        const { tripId } = request.params
        const { email } = request.body

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
        const participant = await prisma.participant.create({
            data: {
                email: email,
                trip_id: tripId
            }
        })

        // Formatando as datas
        const formattedStartDate = dayjs(trip.starts_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')
        const formattedEndtDate = dayjs(trip.ends_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')

        // Configurando o envio de email
        const mail = await getMailClient()

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
                        <a href="${confirmationLink}">
                            Confirmar viagem
                        </a>
                    </p>
                    <br>
                    <p>Caso você não saida do que se trata esse e-mail, apenas ignora esse e-mail.</p>
                </div>
            `.trim()
        })

        console.log(nodemailer.getTestMessageUrl(message))

        return { participantId: participant.id }

    })
}