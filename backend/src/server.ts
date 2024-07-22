import fastify from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifyApiReference from '@scalar/fastify-api-reference'
import fastifyAutoLoad from '@fastify/autoload'
import cors from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod"
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
import { env } from "./env"
import path from "path"


const main = async () => {
  const app = fastify({ logger: true })

  await app.register(cors, {
    origin: '*' // URL do front-end Ex.: http://localhost:3000
  })

  // Configuração do Swagger para a interface da API
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

  // Aplicação de interface para a documentação da API Scalar Referente
  await app.register(fastifyApiReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'solarized',
      metaData: {
        title: 'API Docs Triplann.er',
        image: 'http://localhost:5173/icon.svg'
      },
    },
  })

  /*
  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs2',
    uiConfig: {
      docExpansion: 'list'
    }
  })
  */
 
  // Registrando o fastifyAutoLoad para preencher os schemas do Swagger automaticamente
  await app.register(fastifyAutoLoad, {
    dir: path.join(__dirname, 'routes')
  })

  // Configuração para utilização da integração com Zod
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  // Registrando as rotas
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