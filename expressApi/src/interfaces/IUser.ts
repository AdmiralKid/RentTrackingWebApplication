export interface IUserAuth {
	userId: number;
	userName: string;
	userPassword: string;
}

export interface IUserDetails {
	userId: number;
	firstName: string;
	lastName: string;
	emailId: string;
	mobileNo: string;
}

export interface IUser {
	userAuth: IUserAuth;
	userDetails: IUserDetails;
}
