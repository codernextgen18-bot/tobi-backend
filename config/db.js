import { Pool } from "pg";
import env from "./config.js";

const db = new Pool({
  connectionString: env.DB_URL,
});

db.on("connect", () => {
  console.log("Database connection successful");
});

db.on("error", (error) => {
  console.error("Database error:", error);
});

export default db;