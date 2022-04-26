import { UserMappingService } from "../modules/user/services/usermapping.service";
import { UserService } from "../modules/user/services/user.service";
import { ApartmentService } from "../modules/apartment/services/apartment.service";

export const userService = new UserService();
export const userMappingService = new UserMappingService();
export const apartmentService = new ApartmentService();
