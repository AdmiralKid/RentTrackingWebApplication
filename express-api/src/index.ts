import express, { Request, Response, NextFunction } from "express";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "HOME PAGE" });
});

app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	const { message, stack, name } = err;
	res.status(500).json({ name, message, stack, err });
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
