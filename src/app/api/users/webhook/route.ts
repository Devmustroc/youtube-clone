import { Webhook } from 'svix'
import {headers} from "next/headers";
import {WebhookEvent} from "@clerk/backend";
import { db } from '@/db'
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function POST(req: Request) {
	const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET!

	if (!SIGNING_SECRET) {
		throw new Error('Error: Please add a signing secret to your environment variables.')
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	// Get the headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// Verify webhook
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Missing headers', { status: 400 })
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let event: WebhookEvent;

	try {
		event = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err)
		return new Response('Error verifying webhook', { status: 400 })
	}

		// do something with the event
		// for this guide, we will just log it

	const eventType = event.type;

	if (eventType === 'user.created') {
		const { data } = event;
		await db.insert(users).values({
			clerkId: data.id,
			name: `${data.first_name} ${data.last_name}`,
			imageUrl: data.image_url,
		})
	}

	if (eventType === 'user.deleted') {
		const { data } = event;

		if (!data.id) {
			return new Response('Missing user ID', { status: 400 })
		}
			await db.delete(users).where(eq(users.clerkId, data.id))
	}

	if (eventType === 'user.updated') {
		const { data } = event;

		if (!data.id) {
			return new Response('Missing user ID', { status: 400 })
		}

		await db.update(users).set({
			name: `${data.first_name} ${data.last_name}`,
			imageUrl: data.image_url,
		}).where(eq(users.clerkId, data.id))
	}

	return new Response('Webhook received', { status: 200 })
}