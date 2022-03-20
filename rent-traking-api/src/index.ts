import dotenv from "dotenv";
dotenv.config();

import { Server } from "./server/server";

const server = new Server();

server.setup();

server.run();
