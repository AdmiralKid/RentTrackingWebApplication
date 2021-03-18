import { Router, Request, Response } from "express";
import Joi from "joi";
import userDb from "../database/userDB";
import { User } from "../models";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
	const user = User.GenerateUser(req.body);
	if (user instanceof Joi.ValidationError) {
		res.status(400).send(user.message);
		return;
	}
	user
		.InsertUser()
		.then((isInserted: Boolean) => {
			console.log(isInserted);
			if (isInserted) {
				res.json({ message: "User credentials is inserted into DB" });
			} else {
				res.json({ message: "Could not insert user credentials into DB" });
			}
		})
		.catch((err: any) => {
			res.status(500).json(err);
		})
		.finally();
});

router.post("/signin", (req: Request, res: Response) => {
	const user = User.GenerateUser(req.body);
	if (user instanceof Joi.ValidationError) {
		res.status(400).send(user.message);
		return;
	}
	user
		.GetAccessToken()
		.then((result: [string, number] | null) => {
			if (!result) {
				return res.status(403).send("Incorrect UserName or Password");
			}
			const [accessToken, issueTime] = result;
			res.json({ accessToken, issueTime });
		})
		.catch()
		.finally();
});

router.delete("/delete", User.Authenticate, (req: Request, res: Response) => {
	const userId = req.token.userId;
	userDb
		.DeleteUser(userId)
		.then((isDeleted: Boolean) => {
			if (isDeleted) {
				res.json({ message: "Account is DELETED" });
			} else {
				res.status(404).json({ message: "Account is not found" });
			}
		})
		.catch((err) => {
			res.status(503).json(err);
		})
		.finally();
});

export default router;
