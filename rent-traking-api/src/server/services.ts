import { UserMappingService } from "../modules/user/services/usermapping.service";
import { UserService } from "../modules/user/services/user.service";
export const userService = new UserService();
export const userMappingService = new UserMappingService();
