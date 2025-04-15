import {pgTable, text, timestamp, uniqueIndex, uuid} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	clerkId: text('clerk_id').notNull().unique(),
	name: text("name"),  // Permettre null
	imageUrl: text('image_url'), // Permettre null
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
}, (t) => [uniqueIndex('clerk_id_idx').on(t.clerkId)]);

export const categories = pgTable("categories", {
	id: uuid().primaryKey().defaultRandom(),
	name: text("name").notNull().unique(),
	description: text("description"),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
}, (t) => [uniqueIndex('name_idx').on(t.name)]);