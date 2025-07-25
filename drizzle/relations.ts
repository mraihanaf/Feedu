import { relations } from "drizzle-orm/relations";
import { user, account, session, notes } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	notes: many(notes),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const notesRelations = relations(notes, ({one}) => ({
	user: one(user, {
		fields: [notes.userId],
		references: [user.id]
	}),
}));