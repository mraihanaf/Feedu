import { pgTable, text, timestamp, unique, boolean, foreignKey, uuid, jsonb, date, primaryKey, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const noteType = pgEnum("note_type", ['image', 'markdown'])


export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const competitions = pgTable("competitions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	competitionName: text("competition_name").notNull(),
	description: text().notNull(),
	level: jsonb().notNull(),
	category: jsonb().notNull(),
	isPaid: boolean("is_paid").notNull(),
	registrationStart: date("registration_start"),
	registrationEnd: date("registration_end"),
	publishedDate: text("published_date"),
	posterImageUrl: text("poster_image_url"),
	sourceUrl: text("source_url"),
});

export const events = pgTable("events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	eventName: text("event_name").notNull(),
	description: text().notNull(),
	audience: jsonb().notNull(),
	category: jsonb().notNull(),
	isPaid: boolean("is_paid").notNull(),
	eventDate: date("event_date"),
	publishedDate: text("published_date"),
	posterImageUrl: text("poster_image_url"),
	sourceUrl: text("source_url"),
});

export const notes = pgTable("notes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	title: text().notNull(),
	type: noteType().notNull(),
	markdownContent: text("markdown_content"),
	imageUrl: text("image_url"),
	createdAt: date("created_at").defaultNow().notNull(),
	updatedAt: date("updated_at").defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "notes_user_id_user_id_fk"
		}),
]);

export const savedCompetitions = pgTable("saved_competitions", {
	userId: integer("user_id").notNull(),
	competitionId: integer("competition_id").notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.competitionId], name: "saved_competitions_user_id_competition_id_pk"}),
]);

export const savedEvents = pgTable("saved_events", {
	userId: integer("user_id").notNull(),
	eventId: integer("event_id").notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.eventId], name: "saved_events_user_id_event_id_pk"}),
]);

export const savedNotes = pgTable("saved_notes", {
	userId: uuid("user_id").notNull(),
	noteId: uuid("note_id").notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.noteId], name: "saved_notes_user_id_note_id_pk"}),
]);
