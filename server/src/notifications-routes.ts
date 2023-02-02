import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

const publicKey = 'BJupVO8-odV2SU00jx0nPAD9zDKIyCdbdSMteSzKMu2HPJSwzcy1eu2V0YYF30FIoamL9oXia0H_dWKVQ6HA8A0'
const privateKey = 'H_1VDDVcXuaFWQI1lE772_-QzX9gQ0l94MsJTBaTCuM'

WebPush.setVapidDetails(
    'http://localhost:3333',
    publicKey,
    privateKey,
)

export async function notificationsRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return {
            publicKey,
        }
    })

    app.post('/push/register', (request, reply) => {
        console.log(request.body);
        return reply.status(201).send()
    })

    app.post('/push/send', async (request, reply) => {
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        })

        const { subscription } = sendPushBody.parse(request.body)
        setTimeout(() => {
            WebPush.sendNotification(subscription, 'Mensagem do backend')
        }, 2000)
        return reply.status(201).send()
    })
}