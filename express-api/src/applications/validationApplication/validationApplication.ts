import { User } from "../../models/userModel";
import { credentialsSchema, passwordSchema, userSchema } from "./schemas";

export class ValidationApplication {
	validateUser(user: any) {
		return userSchema.validateAsync(user);
	}
	validatePassword(password: string) {
		return passwordSchema.validateAsync(password);
	}
	validateCredentials(credentials: any) {
		return credentialsSchema.validateAsync(credentials);
	}
}

export const validationApplication = new ValidationApplication();
