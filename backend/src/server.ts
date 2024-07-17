import fastify from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifyAutoLoad from '@fastify/autoload'
import cors from "@fastify/cors"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod"
import { createTrip } from "./routes/create-trip"
import { confirmTrip } from "./routes/confirm-trip"
import { confirmParticipant } from "./routes/confirm-participant"
import { createActivity } from "./routes/create-activity"
import { getActivities } from "./routes/get-activities"
import { createLink } from "./routes/create-link"
import { getLinks } from "./routes/get-links"
import { getParticipants } from "./routes/get-participants"
import { createInvite } from "./routes/create-invite"
import { updateTrip } from "./routes/update-trip"
import { getTripDetails } from "./routes/get-trips-details"
import { getParticipantDetails } from "./routes/get-participant-details"
import { errorHandler } from "./error-handler"
import { env } from "./env"
import path from "path"
import { getLinksSchema } from "./lib/zod-schemas"


const main = async () => {
  const app = fastify({ logger: true })

  await app.register(cors, {
    origin: '*' // URL do front-end Ex.: http://localhost:3000
  })

  await app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Triplann.er',
        description: 'Documentação detalhada e dinâmica do backend utilizando Fastify da aplicação Triplann.er',
        version: '0.1.0'
      },
      tags: [
        {
          name: 'Trip',
          description: 'Rotas de viagens'
        },
        {
          name: 'Participant',
          description: 'Rotas de participantes'
        }
      ],
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: 'Servidor de desenvolvimento'
        }
      ],
    },
    transform: jsonSchemaTransform
  })

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list'
    }
  })

  await app.register(fastifyAutoLoad, {
    dir: path.join(__dirname, 'routes')
  })

  // Configuração para utilização da integração com Zod
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.setErrorHandler(errorHandler)


  await app.register(createTrip)
  await app.register(confirmTrip)
  await app.register(confirmParticipant)
  await app.register(createActivity)
  await app.register(getActivities)
  await app.register(createLink)
  await app.register(getLinks)
  await app.register(getParticipants)
  await app.register(createInvite)
  await app.register(updateTrip)
  await app.register(getTripDetails)
  await app.register(getParticipantDetails)

  await app.ready()
  app.swagger()

  try {
    await app.listen({ port: env.PORT }).then(() => {
      console.log(`Server running in port ${env.PORT}`)
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}
main()