import { userDatabase } from "../../../server/database";
import { DecodedToken } from "../models/decodedIdToken.model";
import { User } from "../models/user.model";

export class UserService {
  constructor() {}

  createOrUpdateUser = async (decodedToken: DecodedToken): Promise<User> => {
    let user: User = this.mapDecodedTokenToUser(decodedToken);
    return await userDatabase.createOrUpdateUser(user);
  };

  private mapDecodedTokenToUser = (token: DecodedToken): User => {
    const user: User = {
      uid: token.uid,
      name: token.name,
      phoneNumber: token.phone_number ?? "",
      email: token.email as string,
      photoURL: token.picture as string,
      userRoleId: 0,
    };
    return user;
  };
}
