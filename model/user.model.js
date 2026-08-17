import db from "../config/db.js";

const createUserTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        dob DATE,
        gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
        bio TEXT,
        status VARCHAR(20) DEFAULT 'active'
          CHECK (status IN ('active', 'inactive', 'banned')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.query(query);

    console.log("User table created successfully");
  } catch (error) {
    console.error("An internal server error", error);
  }
};

export default createUserTable;
