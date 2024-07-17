import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { dayjs } from '../lib/dayjs-locale'
import nodemailer from 'nodemailer'
import { prisma } from "../lib/prisma"
import { getMailClient } from "../lib/email"
import z from "zod"
import { env } from "../env"

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/trips',
        schema: {
            description: 'Rota destinada a cadastrar uma nova viagem',
            tags: ['Trip'],
            body: z.object({
                destination: z.string().min(4).describe('Destino da viagem'),
                starts_at: z.coerce.date().describe('Dia de início da viagem'),
                ends_at: z.coerce.date().describe('Dia de fim da viagem'),
                owner_name: z.string().describe('Nome do proprietário(a) da viagem'),
                owner_email: z.string().email().describe('E-mail do proprietário(a) da viagem'),
                emails_to_invite: z.array(z.string().email()).describe('Lista dos e-mail dos convidados da viagem')
            }),
            response: {
                200: z.object({
                    tripId: z.string().uuid().describe('UUID da viagem')
                }),
                400: z.object({
                    message: z.string().describe('Mensagem do erro')
                })
            }
        },
        handler: async (request, reply) => {
            const { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite } = request.body

            // Verificando se a data de início é anterior a data atual
            if (dayjs(starts_at).isBefore(new Date())) {
                return reply.code(400).send({message: 'Invalid trip start date.'})
            }

            // Verificando se a data de fim é anterior a data de início
            if (dayjs(ends_at).isBefore(starts_at)) {
                return reply.code(400).send({message: 'Invalid trip end date.'})
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
                                ...emails_to_invite.map(email => {return { email }}) // Criando os participantes
                            ]
                        }
                    }
                }
            })

            // Formatando as datas
            const formattedStartDate = dayjs(starts_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')
            const formattedEndtDate = dayjs(ends_at).locale("pt-br").format('DD [de] MMMM [de] YYYY')

            // Gerando link de confirmação da viagem
            const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

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

            return reply.code(200).send({ tripId: trip.id })
        }
    })
}