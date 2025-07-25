import {
    pgTable,
    text,
    boolean,
    timestamp,
    unique,
    foreignKey,
    pgEnum,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const noteLevel = pgEnum("note_level", [
    "High School",
    "Junior High School",
    "Vocational High School",
    "Elementary School",
    "College",
])
export const noteSubject = pgEnum("note_subject", [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Economics",
    "History",
])
export const noteType = pgEnum("note_type", ["markdown", "image"])

export const competitions = pgTable("competitions", {
    id: text().primaryKey().notNull(),
    competitionName: text("competition_name").notNull(),
    description: text().notNull(),
    level: text().array().notNull(),
    category: text().array().notNull(),
    isPaid: boolean("is_paid").notNull(),
    sourceUrl: text("source_url").notNull(),
    posterImageUrl: text("poster_image_url").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
})

export const events = pgTable("events", {
    id: text().primaryKey().notNull(),
    eventName: text("event_name").notNull(),
    description: text().notNull(),
    audience: text().array().notNull(),
    category: text().array().notNull(),
    isPaid: boolean("is_paid").notNull(),
    eventDate: text("event_date"),
    sourceUrl: text("source_url").notNull(),
    posterImageUrl: text("poster_image_url").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
})

export const notes = pgTable("notes", {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    type: noteType().notNull(),
    markdownContent: text("markdown_content"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
    level: noteLevel(),
    subject: noteSubject(),
    href: text(),
})

export const verification = pgTable("verification", {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }),
})

export const user = pgTable(
    "user",
    {
        id: text().primaryKey().notNull(),
        name: text().notNull(),
        email: text().notNull(),
        emailVerified: boolean("email_verified").notNull(),
        image: text(),
        createdAt: timestamp("created_at", { mode: "string" }).notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [unique("user_email_unique").on(table.email)],
)

export const account = pgTable(
    "account",
    {
        id: text().primaryKey().notNull(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id").notNull(),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at", {
            mode: "string",
        }),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
            mode: "string",
        }),
        scope: text(),
        password: text(),
        createdAt: timestamp("created_at", { mode: "string" }).notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "account_user_id_user_id_fk",
        }).onDelete("cascade"),
    ],
)

export const session = pgTable(
    "session",
    {
        id: text().primaryKey().notNull(),
        expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
        token: text().notNull(),
        createdAt: timestamp("created_at", { mode: "string" }).notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "session_user_id_user_id_fk",
        }).onDelete("cascade"),
        unique("session_token_unique").on(table.token),
    ],
)
