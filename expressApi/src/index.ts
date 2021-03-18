import express, { Request, Response } from "express";
import api from "./routes";
import dotenv from "dotenv";
import { User } from "./models";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/api", api);

app.get("/", User.Authenticate, (req: Request, res: Response) => {
	res.send("OK");
});

const PORT = process.env.API_PORT ?? 5000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
