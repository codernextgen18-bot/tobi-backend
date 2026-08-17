import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.PORT ||
  !process.env.DB_URL ||
  !process.env.JWT_ACCESS_SECRET ||
  !process.env.JWT_REFRESH_SECRET ||
  !process.env.NODE_ENV
) {
  console.error("All env require");
}

const env = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV
};

export default env;