import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema"; // ensure this is an object of tables

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

// Union type with your schema
type DB = NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema>;

let db: DB;

if (process.env.NODE_ENV === "production") {
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzleNeon({ client: sql, schema });
} else {
  db = drizzlePostgres({
    connection: {
      connectionString: process.env.DATABASE_URL!,
    },
    schema,
  });
}

export default db;
