import { Router } from "express";
import usersRoute from "./userRoute";
import flatRoute from "./flatRoute";

import { User } from "../models";

const router = Router();

router.use("/user", usersRoute);
router.use("/flat", User.Authenticate ,flatRoute);

export default router;
