import { userDatabase } from "../../../server/database";
import { userMappingService } from "../../../server/services";
import { DecodedToken } from "../models/decodedIdToken.model";
import { User } from "../models/user.model";

export class UserService {
    constructor() {}
    async createOrUpdateUser(decodedToken: DecodedToken): Promise<User> {
        let user: User = userMappingService.mapDecodedTokenToUser(decodedToken);
        return await userDatabase.createOrUpdateUser(user);
    }
}
