import express, { Request, Response } from "express";
import api from "./routes";
import dotenv from "dotenv";
import { User } from "./models";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

app.get("/", User.Authenticate, (req: Request, res: Response) => {
	res.send("OK");
});

app.listen(5000, () => {
	console.log("server is running");
});
