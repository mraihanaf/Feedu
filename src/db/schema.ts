import { pgTable, text, boolean, date, jsonb, primaryKey, integer, index, pgEnum, uuid } from "drizzle-orm/pg-core";
import { user } from "../../auth-schema";

export const competitions = pgTable("competitions", {
  id: uuid("id").primaryKey().defaultRandom(),
  competitionName: text("competition_name").notNull(),
  description: text("description").notNull(),

  level: jsonb("level").$type<(
    "Elementary School" | "Junior High School" | "High School" | "Vocational High School" | "College" | "General Public"
  )[]>().notNull(),

  category: jsonb("category").$type<(
    "Science" |
    "Technology" |
    "Engineering" |
    "Mathematics" |
    "Arts" |
    "Social Sciences" |
    "Business" |
    "Health" |
    "Environment" |
    "Sports"
  )[]>().notNull(),

  isPaid: boolean("is_paid").notNull(),

  registrationStart: date("registration_start"),
  registrationEnd: date("registration_end"),

  publishedDate: text("published_date"),
  posterImageUrl: text("poster_image_url"),
  sourceUrl: text("source_url"),
});


export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    eventName: text("event_name").notNull(),
    description: text("description").notNull(),
    
    audience: jsonb("audience").$type<(
        "Elementary School" | "Junior High School" | "High School" | "Vocational High School" | "College" | "General Public"
    )[]>().notNull(),
    
    category: jsonb("category").$type<(
        "Workshops" |
        "Seminars" |
        "Conferences" |
        "Webinars"
    )[]>().notNull(),
    
    isPaid: boolean("is_paid").notNull(),
    
    eventDate: date("event_date"),
    
    publishedDate: text("published_date"),
    posterImageUrl: text("poster_image_url"),
    sourceUrl: text("source_url"),
})

export const savedEvents = pgTable('saved_events', {
    userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  }, (table) => [
    primaryKey({ columns: [table.userId, table.eventId] }),
    index('saved_events_user_id_idx').on(table.userId),
    index('saved_events_event_id_idx').on(table.eventId),
  ]);
  
export const savedCompetitions = pgTable('saved_competitions', {
    userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    competitionId: integer('competition_id').notNull().references(() => competitions.id, { onDelete: 'cascade' }),
  }, (table) => [
    primaryKey({ columns: [table.userId, table.competitionId] }),
    index('saved_competitions_user_id_idx').on(table.userId),
    index('saved_competitions_competition_id_idx').on(table.competitionId),
  ]);

export const noteTypeEnum = pgEnum("note_type", ["image", "markdown"]);
export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userid: text("user_id").notNull().references(() => user.id),
  title: text("title").notNull(),
  type: noteTypeEnum("type").notNull(),
  markdownContent: text("markdown_content"),
  imageUrl: text("image_url"),

  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
})

export const savedNotes = pgTable('saved_notes', {
    userId: uuid('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    noteId: uuid('note_id').notNull().references(() => notes.id, { onDelete: 'cascade' }),
  }, (table) => [
    primaryKey({ columns: [table.userId, table.noteId] }),
    index('saved_notes_user_id_idx').on(table.userId),
    index('saved_notes_note_id_idx').on(table.noteId),
  ]);