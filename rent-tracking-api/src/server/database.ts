import { ApartmentDatabase } from "../modules/apartment/data/apartment.db";
import { FlatDatabase } from "../modules/flat/data/flat.db";
import { UserDatabase } from "../modules/user/data/user.db";

export const userDatabase = new UserDatabase();
export const apartmentDatabase = new ApartmentDatabase();
export const flatDatabase = new FlatDatabase();
