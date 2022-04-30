import { Router } from "express";
import statusRouter from "./status.routes";
import authRouter from "./auth.routes";
import apartmentRouter from "./apartment.routes";
import { verifyClientUserToken } from "../middleware/auth.middleware";

const router = Router();
router.use("/status", statusRouter);
router.use("/auth", verifyClientUserToken, authRouter);
router.use("/apartment", verifyClientUserToken, apartmentRouter);

export default router;
