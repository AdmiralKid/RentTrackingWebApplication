import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "../routes";
import { logMiddleware } from "../middleware/logging.middleware";
import { errorHandler } from "../middleware/errorHandler.middleware";
import { initializeFirebase } from "./firebase";

export class Server {
  private app = express();

  constructor() {}

  setup() {
    let { app } = this;
    initializeFirebase();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    app.use(logMiddleware);

    app.use("/api", router);

    // Always at the end
    app.use(errorHandler);
  }

  run() {
    const PORT = process.env["PORT"];

    this.app.listen(PORT, () => {
      console.log(`listening on port ${PORT}.`);
    });
  }
}
