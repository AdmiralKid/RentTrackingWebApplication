import { UserService } from "../modules/user/services/user.service";
import { ApartmentService } from "../modules/apartment/services/apartment.service";
import { AdminService } from "../modules/admin/services/admin.service";
import { FlatService } from "../modules/flat/services/flat.service";
import { FlatTenancyService } from "../modules/flat-tenancy/services/flat-tenancy.service";
import { LookupService } from "../modules/lookup/services/lookup.service";
import { BillService } from "../modules/bill/services/bill.service";

export const userService = new UserService();
export const apartmentService = new ApartmentService();
export const adminService = new AdminService();
export const flatService = new FlatService();
export const flatTenancyService = new FlatTenancyService();
export const lookupService = new LookupService();
export const billService = new BillService();