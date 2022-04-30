import { Router } from "express";
import { conn } from "../db/mysql.connection";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: { status: "OK", dbState: conn.state } });
});

export default router;
