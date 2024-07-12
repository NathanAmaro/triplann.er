import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { dayjs } from '../lib/dayjs-locale'
import nodemailer from 'nodemailer'
import { prisma } from "../lib/prisma"
import { getMailClient } from "../lib/email"
import { createTipsSchema } from "../lib/zod-schemas"

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips', createTipsSchema, async (request) => {
        const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } = request.body

        // Verificando se a data de início é anterior a data atual
        if (dayjs(starts_at).isBefore(new Date())) {
            throw new Error('Invalid trip start date.')
        }

        // Verificando se a data de fim é anterior a data de início
        if (dayjs(ends_at).isBefore(starts_at)) {
            throw new Error('Invalid trip end date.')
        }

        // Criando a viagem
        const trip = await prisma.trip.create({
            data: {
                destination,
                starts_at,
                ends_at,
                participants: {
                    createMany: {
                        data: [
                            { // Criando o proprietário
                                name: owner_name,
                                email: owner_email,
                                is_owner: true,
                                is_confirmed: true
                            },
                            ...emails_to_invite.map(email => { // Criando os participantes
                                return { email }
                            })
                        ]
                    }
                }
            }
        })

        // Formatando as datas
        const formattedStartDate = dayjs(starts_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')
        const formattedEndtDate = dayjs(ends_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')

        // Gerando link de confirmação da viagem
        const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`

        // Configurando o envio de email
        const mail = await getMailClient()

        // Configurando o email para o proprietário
        const message = await mail.sendMail({
            from: {
                name: 'Equipe plann.er',
                address: 'suport@plann.er'
            },
            to: {
                name: owner_email,
                address: owner_email
            },
            subject: `Confirmação de viagem para ${destination} em ${formattedStartDate}`,
            html: `
                <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                    <p>Você solicitou a criação de uma viagem para <strong>${destination}, Brasil</strong> nas data de <strong>${formattedStartDate} até ${formattedEndtDate}</strong>.</p>
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

        return { tripId: trip.id }
    })
}