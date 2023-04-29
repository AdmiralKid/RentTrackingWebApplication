import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { Bill } from "../models/bill.model";

export class BillDatabase {
  constructor() {}
  createbill = async (bill: Bill): Promise<boolean> => {
    const queryString = "CALL `pBill_Create`(?, ?, ?, ?, ?, ?, ?);";
    const date = bill.paymentDate.toString().split("T")[0];
    return new Promise((res, rej) => {
      conn.query(
        queryString,
        [bill.flatTenancyId, bill.receiverId, bill.amount, bill.billTypeId, bill.paymentMethodId, date, bill.comments],
        (error, result) => {
          if (error) {
            rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
          }
          res(result.affectedRows > 0);
        }
      );
    });
  };
  deletebill = async (billId: number): Promise<boolean> => {
    const queryString = `DELETE FROM bill WHERE bill_id = ${billId}`;
    return new Promise((res, rej) => {
      conn.query(queryString, (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          res(result.affectedRows > 0);
        }
      });
    });
  };
  fetchBillByFlatTenancyId = async (flatTenancyId: number): Promise<Bill[]> => {
    {
      const queryString = `CALL pBill_Get_By_FlatTenancyId(?);`;
      return new Promise((res, rej) => {
        conn.query(queryString, [flatTenancyId], (error, result) => {
          if (error) {
            rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
          } else {
            let rows = result[0] as Bill[];
            res(rows);
          }
        });
      });
    }
  };
}
