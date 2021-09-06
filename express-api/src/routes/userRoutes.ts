import { Router } from "express";

import userController from "../controllers/userController";
import validationMiddleware from "../middleware/validationMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const { validateCredentials, validatePassword, validateUser } =
	validationMiddleware;

const { verifyToken } = authMiddleware;

const { register, signin, getUser, deleteUser } = userController;

const router = Router();

router.post("/register", validateUser, validatePassword, register);

router.post("/signin", validateCredentials, signin);

router.get("/", verifyToken, getUser);

router.delete("/", verifyToken, deleteUser);

export default router;
