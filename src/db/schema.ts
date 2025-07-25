import {
    pgTable,
    text,
    timestamp,
    boolean,
    pgEnum,
  } from "drizzle-orm/pg-core"
  
  // ENUMS
  export const noteTypeEnum = pgEnum("note_type", ["markdown", "image"])
  
  export const noteLevelEnum = pgEnum("note_level", [
    "High School",
    "Junior High School",
    "Vocational High School",
    "Elementary School",
    "College",
  ])
  
  export const noteSubjectEnum = pgEnum("note_subject", [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Economics",
    "History",
  ])
  
  // TABLES
  
  export const competitions = pgTable("competitions", {
    id: text("id").primaryKey(),
    competitionName: text("competition_name").notNull(),
    description: text("description").notNull(),
    level: text("level").array().notNull(),             // string[]
    category: text("category").array().notNull(),       // string[]
    isPaid: boolean("is_paid").notNull(),               // boolean
    sourceUrl: text("source_url").notNull(),
    posterImageUrl: text("poster_image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  })
  
  export const events = pgTable("events", {
    id: text("id").primaryKey(),
    eventName: text("event_name").notNull(),
    description: text("description").notNull(),
    audience: text("audience").array().notNull(),       // string[]
    category: text("category").array().notNull(),       // string[]
    isPaid: boolean("is_paid").notNull(),               // boolean
    eventDate: text("event_date"),                      // ISO string (nullable)
    sourceUrl: text("source_url").notNull(),
    posterImageUrl: text("poster_image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  })
  
  export const notes = pgTable("notes", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    type: noteTypeEnum("type").notNull(),               // "markdown" | "image"
    markdownContent: text("markdown_content"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    level: noteLevelEnum("level"),                      // optional
    subject: noteSubjectEnum("subject"),                // optional
    href: text("href"),
  })
  