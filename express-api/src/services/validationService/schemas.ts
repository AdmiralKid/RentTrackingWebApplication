import joi from "joi";

export const userSchema = joi.object({
	username: joi.string().min(6).required(),
	email: joi.string().email().required(),
	userType: joi.string().valid("client", "admin").required(),
});

export const passwordSchema = joi.string().min(6).required();

export const credentialsSchema = joi.object({
	username: joi.string().min(6).required(),
	password: passwordSchema,
});
