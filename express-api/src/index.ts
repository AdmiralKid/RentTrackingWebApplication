import { UserList } from "./database/user-database/list/userList";
import { Server } from "./server";
import { conn } from "./database/connections/mysql";
import { UserMySQLDb } from "./database/user-database/mysql/userdb";

const userDb = new UserList();

const server = new Server({ userDb });

server.setup();

server.run();
