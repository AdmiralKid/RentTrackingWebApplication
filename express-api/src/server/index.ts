import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

import { BaseRoutes } from "../routes";
import { Databases } from "./databases";
import { Middlewares } from "./middlewares";
import { Services } from "./services";

const PORT = 5000;
const HOST = "localhost";

export interface Server {
	app: Express;
	services: Services;
	middlewares: Middlewares;
	baseRoutes: BaseRoutes;
}

export class Server {
	/**
	 * Nothing Should be edited here. ABSOLUTELY NOTHING!!!
	 *
	 * unless you know what you are doing
	 */
	constructor(public databases: Databases) {
		this.app = express();
		this.services = new Services(databases);
		this.middlewares = new Middlewares(this.services);
		this.baseRoutes = new BaseRoutes(this.services, this.middlewares);
	}

	/**
	 * Add your external middlewares here
	 */
	setup = () => {
		const { app, baseRoutes } = this;

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cors());

		app.use("/api", baseRoutes.routes);

		app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			const { code, message, name, stack } = err;
			res.status(code ?? 500).json({ message, name, stack });
		});
	};

	run = () => {
		this.app.listen(PORT, HOST, () => {
			console.log(`Listening on http://${HOST}:${PORT}`);
		});
	};
}
