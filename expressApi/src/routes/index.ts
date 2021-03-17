import { Router } from "express";
import users from "./userRoute";

const router = Router();

router.use("/user", users);

export default router;
