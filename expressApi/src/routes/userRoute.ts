import { Router, Request, Response } from "express";
import Joi from "joi";
import { userDb } from "../database/userDB";
import { User } from "../models";
import { userSchema, userDetailsSchema } from "../schemas";
import { IUser, IUserDetails } from "../interfaces";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
	const result = userSchema.validate(req.body);
	if (result.error) {
		res.status(400).send(result.error.message);
		return;
	}

	userDb
		.InsertUser(result.value as IUser)
		.then((userId: number) => {
			if (userId === -1) {
				res.status(409).json({ message: "Could not insert the user" });
			} else {
				res.json({ message: "User is inserted into database" });
			}
		})
		.catch((err) => {
			res.status(503).json(err);
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
		.catch((err) => {
			res.status(503).json(err);
		})
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

router.put("/update", User.Authenticate, (req: Request, res: Response) => {
	const result = userDetailsSchema.validate(req.body);
	if (result.error) {
		res.status(400).send(result.error.message);
		return;
	}
	const userDetails = <IUserDetails>result.value;
	userDetails.userId = req.token.userId;
	userDb
		.UpdateUser(userDetails)
		.then(() => {
			res.json({ message: "User Details is updated" });
		})
		.catch((err) => {
			res.status(503).json(err);
		})
		.finally();
});

router.get("/details", User.Authenticate, (req: Request, res: Response) => {
	const userId = req.token.userId;
	console.log(userId);
	userDb
		.GetUserDetails(userId)
		.then((user: IUserDetails | null) => {
			console.log(user);
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ message: "User Not Found" });
			}
		})
		.catch((err) => {
			res.status(503).json(err);
		})
		.finally();
});

export default router;
