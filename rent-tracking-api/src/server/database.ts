import { ApartmentDatabase } from "../modules/apartment/data/apartment.db";
import { UserDatabase } from "../modules/user/data/user.db";

export const userDatabase = new UserDatabase();
export const apartmentDatabase = new ApartmentDatabase();
