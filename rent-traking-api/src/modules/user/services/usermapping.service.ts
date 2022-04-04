import { DecodedToken } from "../models/decodedIdToken.model";
import { User } from "../models/user.model";
import { UserTable } from "../models/userTable";

export class UserMappingService {
    constructor() {}
    mapDecodedTokenToUser(token: DecodedToken): User {
        const user: User = {
            userId: token.uid,
            name: token.name,
            phoneNumber: token.phone_number ?? "",
            email: token.email as string,
            photoUrl: token.picture as string,
            userRoleId: 0,
        };
        return user;
    }
    mapUserTableToUser(userTable: UserTable): User {
        const user: User = {
            userId: userTable.user_id,
            name: userTable.name,
            phoneNumber: userTable.phone_number,
            email: userTable.email,
            photoUrl: userTable.photo_url,
            userRoleId: userTable.user_role_id,
        };
        return user;
    }
}
