import { userDatabase } from "../../../server/database";
import { DecodedToken } from "../models/decodedIdToken.model";
import { User, UserRole } from "../models/user.model";
import { UserLookup } from "../models/userlookup";

export class UserService {
  constructor() {}

  createOrUpdateUser = async (decodedToken: DecodedToken): Promise<User> => {
    let user: User = this.mapDecodedTokenToUser(decodedToken);
    return await userDatabase.createOrUpdateUser(user);
  };

  fetchUserByuserId = async (userId: string, roleId: number): Promise<User> => {
    return await userDatabase.fetchUserByUserId(userId, roleId);
  };

  fetchTenantLookup = async (): Promise<UserLookup[]> => {
    return await userDatabase.fetchTenantLookup();
  };

  private mapDecodedTokenToUser = (token: DecodedToken): User => {
    let roleId = token.owner
      ? UserRole.OWNER
      : token.tenant
      ? UserRole.TENANT
      : token.admin
      ? UserRole.ADMIN
      : UserRole.DEFAULT;
    const user: User = {
      uid: token.uid,
      name: token.name,
      phoneNumber: token.phone_number ?? "",
      email: token.email as string,
      photoURL: token.picture as string,
      userRoleId: roleId,
    };
    return user;
  };
}
