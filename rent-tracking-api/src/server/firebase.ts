import { initializeApp } from "firebase-admin/app";
import { environment } from "../environments/environment";
import * as admin from "firebase-admin"

const serviceAccount = require("../renttracking-firebase-key.json");

export const initializeFirebase = () => initializeApp({...environment.firebase, credential: admin.credential.cert(serviceAccount)});