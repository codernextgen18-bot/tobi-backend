import express from "express";
import cors from "cors";
import createUserTable from "./model/user.model.js";

createUserTable();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Welcome to tobi chat server"));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on http://127.0.0.1:${PORT}`));