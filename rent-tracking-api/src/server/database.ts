import { ApartmentDatabase } from "../modules/apartment/data/apartment.db";
import { BillDatabase } from "../modules/bill/data/bill.db";
import { FlatTenancyDatabase } from "../modules/flat-tenancy/data/flat-tenancy.db";
import { FlatDatabase } from "../modules/flat/data/flat.db";
import { LookupDatabase } from "../modules/lookup/data/lookup.db";
import { UserDatabase } from "../modules/user/data/user.db";

export const userDatabase = new UserDatabase();
export const apartmentDatabase = new ApartmentDatabase();
export const flatDatabase = new FlatDatabase();
export const flatTenancyDatabase = new FlatTenancyDatabase();
export const lookupDatabase = new LookupDatabase();
export const billDatabase = new BillDatabase();
