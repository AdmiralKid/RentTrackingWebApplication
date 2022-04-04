import { Router } from "express";
import statusRouter from "./status.routes";
import authRouter from "./auth.routes";

const router = Router();
router.use("/status", statusRouter);
router.use("/auth", authRouter);
export default router;
