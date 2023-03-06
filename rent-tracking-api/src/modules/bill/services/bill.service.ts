import { billDatabase } from "../../../server/database";
import { Bill } from "../models/bill.model";

export class BillService {
  constructor() {}
  createbill = async (bill: Bill) : Promise<boolean> => {
    return await billDatabase.createbill(bill);
  };
  deletebill = async (billId: number) : Promise<boolean> => {
    return await billDatabase.deletebill(billId);
  };
  fetchBillByFlatTenancyId = async (flatTenancyId: number) : Promise<Bill[]> => {
    return await billDatabase.fetchBillByFlatTenancyId(flatTenancyId);
  };
}
