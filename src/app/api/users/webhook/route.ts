import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from "svix"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"


export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if(!SIGNING_SECRET) {
        throw new Error('no Signing secret')
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error' , {
           status:400
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-signature': svix_signature,
            'svix-timestamp' : svix_timestamp
        }) as WebhookEvent
    } catch (err) {
        console.log('Error' , err)
        return new Response ('Error', {
            status:400
        })
    }


    const eventType = evt.type

    if (eventType === 'user.created') {
        const {data} = evt
        await db.insert(users).values({
            clerkId: data.id,
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url
        })
    }

    if (eventType === 'user.deleted') {
        const {data} = evt

        if (!data) {
            return new Response ("user.id", {status:400});
        }

        await db.delete(users).where(eq(users.clerkId , data.id))

    }

    if (eventType === 'user.updated') {
        const {data} = evt

        await db.update(users).set({
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url
        })
        .where(eq(users.clerkId , data.id))
    }

    return new Response ('WebHook' , {status: 200})
 }