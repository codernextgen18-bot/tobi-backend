import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DatabaseModel from "./model/database.models.js";
import AuthRouter from "./router/auth.route.js"
import ProfileRouter from "./router/profile.route.js";

DatabaseModel(); // call all database models

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', AuthRouter);
app.use('/api', ProfileRouter);
app.get("/", (req, res) => res.send("Welcome to tobi chat server"));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on http://127.0.0.1:${PORT}`));