import Joi from "joi";

const userSchema = Joi.object({
	userId: Joi.number(),
	userName: Joi.string().min(5).max(30).required(),
	password: Joi.string().min(5).max(30).required(),
});

export default userSchema;

interface IUserAuth {
	userName: string;
	password?: string;
}

interface IUserDetails {
	userId: number,
	firstName: string;
	lastName: string;
	mobileno: string;
	emailId: string;
}

interface IUser {
	userAuth?: IUserAuth;
	userDetails: IUserDetails;
}

interface IAccessToken {
	userId: number
	issueTime: number
}
