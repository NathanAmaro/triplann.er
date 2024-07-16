import { FastifySchema } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createTipsSchema = {
    schema: {
        body: z.object({
            destination: z.string().min(4),
            starts_at: z.coerce.date(),
            ends_at: z.coerce.date(),
            owner_name: z.string(),
            owner_email: z.string().email(),
            emails_to_invite: z.array(z.string().email())
        })
    }
}

export const confirmTripSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        })
    }
}

export const confirmParticipantSchema = {
    schema: {
        params: z.object({
            participantId: z.string().uuid()
        })
    }
}

export const createActivitySchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid().describe('Some description for username')
        }),
        body: z.object({
            title: z.string().min(4),
            occurs_at: z.coerce.date()
        })
    }
}

export const getActivitiesSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        })
    }
}

export const createLinkSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        }),
        body: z.object({
            title: z.string().min(4),
            url: z.string().url()
        })
    }
}

export const getLinksSchema = {
    params: z.object({
        tripId: z.string().uuid()
    })

}

export const getParticipantsSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        })
    }
}

export const createInviteSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        }),
        body: z.object({
            email: z.string().email()
        })
    }
}

export const updateTripSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        }),
        body: z.object({
            destination: z.string().min(4),
            starts_at: z.coerce.date(),
            ends_at: z.coerce.date()
        })
    }
}

export const getTripDetailsSchema = {
    schema: {
        params: z.object({
            tripId: z.string().uuid()
        })
    }
}

export const getParticipantDetailsSchema = {
    schema: {
        params: z.object({
            participantId: z.string().uuid()
        })
    }
}