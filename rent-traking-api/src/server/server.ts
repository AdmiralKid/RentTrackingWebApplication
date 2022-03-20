import express from "express";
import cors from "cors";
import router from "../routes";
import { logRequest } from "../middleware/logging.middleware";

export class Server {
	private app = express();

	constructor() {}

	setup() {
		let { app } = this;
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cors());
		app.use(logRequest);
		app.use("/api", router);
	}

	run() {
		const PORT = process.env["PORT"];
		this.app.listen(PORT, () => {
			console.log(`listening on port ${PORT}.`);
		});
	}
}
