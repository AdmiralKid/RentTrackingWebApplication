import Joi from "joi";

export const userAuthSchema = Joi.object({
	userId: Joi.number(),
	userName: Joi.string().min(5).max(30).required(),
	userPassword: Joi.string().min(5).max(30).required(),
});

export const userDetailsSchema = Joi.object({
	userId: Joi.number(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	emailId: Joi.string().email().required(),
	mobileNo: Joi.string().min(10).max(10).required(), //set up pattern for mobile number pending...
});

export const userSchema = Joi.object({
	userAuth: userAuthSchema,
	userDetails: userDetailsSchema,
});

// export { userAuthSchema };
