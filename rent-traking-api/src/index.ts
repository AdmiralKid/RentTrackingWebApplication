import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
const firebaseConfig = {
	apiKey: "AIzaSyB8zl8OmShqrDzZfA72PGPb2I7sWORUze8",
	authDomain: "renttrackingauth.firebaseapp.com",
	projectId: "renttrackingauth",
	storageBucket: "renttrackingauth.appspot.com",
	messagingSenderId: "999725662599",
	appId: "1:999725662599:web:439c11f6b60abab20f9322"
  };
export const app2 = initializeApp(firebaseConfig);

dotenv.config();

import { Server } from "./server/server";

const server = new Server();

server.setup();

server.run();
