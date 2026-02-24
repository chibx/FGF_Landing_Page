import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import * as yup from "yup";
import { Pool } from "pg";

/**
 * 
 * CREATE TABLE registrations (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   address TEXT NOT NULL,
   phone_number VARCHAR(20) NOT NULL,
   first_timer BOOLEAN NOT NULL DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const schema = yup.object({
  full_name: yup.string().required("Fullname is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  phone_number: yup.string().required("Phone number is required"),
  first_timer: yup.boolean().default(false),
});

const app = new Hono();

app.post("/api/register", async (c) => {
  const form = await c.req.formData();
  const body = {} as yup.InferType<typeof schema>;

  for (const [key, value] of form.entries()) {
    if (value instanceof File) continue;
    const k = key as keyof yup.InferType<typeof schema>;
    // @ts-expect-error - we know the key exists in the schema
    body[k] = k == "first_timer" ? (value == "true" ? true : false) : value;
  }

  try {
    const validated = await schema.validate(body);
    pool.query(
      "INSERT INTO registrations (name, email, address, phone_number, first_timer) VALUES ($1, $2, $3, $4, $5)",
      [
        validated.full_name,
        validated.email,
        validated.address,
        validated.phone_number,
        validated.first_timer,
      ]
    );
    return c.json({ success: true });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return c.json({ success: false, error: error.message }, 400);
    }
    return c.json({ success: false, error: "Something went wrong, please try again later" }, 500);
  }
});

app.use(
  "/*",
  serveStatic({
    root: "./static",
//    async getContent() {
//      return null;
//    },
  })
);


//serve({
//  fetch: app.fetch,
//  port: 3000,
//});

export default app;
