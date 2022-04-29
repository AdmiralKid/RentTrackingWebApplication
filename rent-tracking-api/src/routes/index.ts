import { Router } from "express";
import statusRouter from "./status.routes";
import authRouter from "./auth.routes";
import apartmentRouter from "./apartment.routes";

const router = Router();
router.use("/status", statusRouter);
router.use("/auth", authRouter);
router.use("/apartment", apartmentRouter);
export default router;
