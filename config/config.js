import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT || !process.env.DB_URL || !process.env.JWT_SECRET) console.error("All env require");

const env = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;