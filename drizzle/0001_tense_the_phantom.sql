CREATE TYPE "public"."note_type" AS ENUM('image', 'markdown');--> statement-breakpoint
CREATE TABLE "competitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_name" text NOT NULL,
	"description" text NOT NULL,
	"level" jsonb NOT NULL,
	"category" jsonb NOT NULL,
	"is_paid" boolean NOT NULL,
	"registration_start" date,
	"registration_end" date,
	"published_date" text,
	"poster_image_url" text,
	"source_url" text
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_name" text NOT NULL,
	"description" text NOT NULL,
	"audience" jsonb NOT NULL,
	"category" jsonb NOT NULL,
	"is_paid" boolean NOT NULL,
	"event_date" date,
	"published_date" text,
	"poster_image_url" text,
	"source_url" text
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"type" "note_type" NOT NULL,
	"markdown_content" text,
	"image_url" text,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_competitions" (
	"user_id" integer NOT NULL,
	"competition_id" integer NOT NULL,
	CONSTRAINT "saved_competitions_user_id_competition_id_pk" PRIMARY KEY("user_id","competition_id")
);
--> statement-breakpoint
CREATE TABLE "saved_events" (
	"user_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	CONSTRAINT "saved_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "saved_notes" (
	"user_id" uuid NOT NULL,
	"note_id" uuid NOT NULL,
	CONSTRAINT "saved_notes_user_id_note_id_pk" PRIMARY KEY("user_id","note_id")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_competitions" ADD CONSTRAINT "saved_competitions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_competitions" ADD CONSTRAINT "saved_competitions_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_events" ADD CONSTRAINT "saved_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_events" ADD CONSTRAINT "saved_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_notes" ADD CONSTRAINT "saved_notes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_notes" ADD CONSTRAINT "saved_notes_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "saved_competitions_user_id_idx" ON "saved_competitions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_competitions_competition_id_idx" ON "saved_competitions" USING btree ("competition_id");--> statement-breakpoint
CREATE INDEX "saved_events_user_id_idx" ON "saved_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_events_event_id_idx" ON "saved_events" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "saved_notes_user_id_idx" ON "saved_notes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_notes_note_id_idx" ON "saved_notes" USING btree ("note_id");