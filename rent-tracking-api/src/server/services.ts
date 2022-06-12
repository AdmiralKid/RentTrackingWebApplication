import { UserService } from "../modules/user/services/user.service";
import { ApartmentService } from "../modules/apartment/services/apartment.service";
import { AdminService } from "../modules/admin/services/admin.service";

export const userService = new UserService();
export const apartmentService = new ApartmentService();
export const adminService = new AdminService();
