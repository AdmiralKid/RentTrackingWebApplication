import { Router, Request, Response, NextFunction } from "express";
import { tokenApplication } from "../applications/tokenApplication";
import { userApplication } from "../applications/userApplication";
import {
	credentialsValidation,
	passwordValidation,
	tokenVerification,
	userValidation,
} from "../middleware";
import { User } from "../models/userModel";

const router = Router();

router.post(
	"/register",
	userValidation,
	passwordValidation,
	(req: Request, res: Response, next: NextFunction) => {
		const user = res.locals.user as User;
		const password = res.locals.password as string;
		userApplication
			.createUser(user, password)
			.then(() => {
				res.json({ message: "User created" });
			})
			.catch(next);
	}
);

router.post(
	"/signin",
	credentialsValidation,
	(req: Request, res: Response, next: NextFunction) => {
		const credentials = res.locals.credentials as {
			username: string;
			password: string;
		};
		const { username, password } = credentials;
		tokenApplication
			.getAccessToken(username, password)
			.then((token) => {
				res.json({ token });
			})
			.catch(next);
	}
);

router.get(
	"/",
	tokenVerification,
	(req: Request, res: Response, next: NextFunction) => {
		const { user } = res.locals;
		res.json(user);
	}
);

router.delete(
	"/",
	tokenVerification,
	(req: Request, res: Response, next: NextFunction) => {
		const { userId } = res.locals.user as User;
		userApplication
			.deleteUser(userId)
			.then(() => {
				res.json({ message: "User Deleted" });
			})
			.catch(next);
	}
);

export default router;
