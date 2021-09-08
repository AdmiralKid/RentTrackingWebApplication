import joi from "joi";

import { userTypes } from "../../models/userModel";

export const emailSchema = joi.string().email();
export const passwordSchema = joi.string().min(6);

export const userSchema = joi.object({
	username: joi.string().min(6).required(),
	email: emailSchema.required(),
	userType: joi.string().valid(userTypes.admin, userTypes.client).required(),
});

export const credentialsSchema = joi
	.object({
		username: joi.string().min(6),
		email: emailSchema,
		password: passwordSchema.required(),
	})
	.xor("username", "email");
