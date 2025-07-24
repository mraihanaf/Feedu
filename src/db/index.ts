import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres"
import * as AuthSchema from "@/../auth-schema"
import * as DBSchema from "@/db/schema"

const schema = { ...AuthSchema, ...DBSchema }

let db: ReturnType<typeof drizzleNeon> | ReturnType<typeof drizzlePostgres>

if (process.env.NODE_ENV === "production") {
    const sql = neon(process.env.DATABASE_URL!)
    db = drizzleNeon({ client: sql, schema: schema })
} else {
    db = drizzlePostgres({
        connection: {
            connectionString: process.env.DATABASE_URL!,
        },
        schema: schema,
    })
}

export default db
