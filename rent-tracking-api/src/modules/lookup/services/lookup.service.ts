import { lookupDatabase } from "../../../server/database";
import { UserLookup } from "../../user/models/userlookup";
import { BillType } from "../models/bill-type.model";
import { PaymentMethodType } from "../models/payment-type.model";

export class LookupService {
  constructor() {}
  fetchAllBillType = async (): Promise<BillType[]> => {
    return await lookupDatabase.fetchAllBillType();
  };
  fetchAllPaymentMethodType = async (): Promise<PaymentMethodType[]> => {
    return await lookupDatabase.fetchAllPaymentMethodType();
  };
  fetchAllOwner = async (): Promise<UserLookup[]> => {
    return await lookupDatabase.fetchAllOwners();
  };
}
