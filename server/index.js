import express from "express";
import {checkConnect} from "./configs/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

checkConnect();

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server running in: http://localhost:${port}`);
});
