import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { FlatTenancy } from "../models/flat-tenancy.model";

export class FlatTenancyDatabase {
  constructor() {}
  fetchFlatTenancyByTenantId = async (tenantId: string, ownerId: string): Promise<FlatTenancy> => {
    const queryString = "CALL `pFlatTenancy_Get_By_TenantId`(?, ?);";
    return new Promise((res, rej) => {
      conn.query(queryString, [tenantId, ownerId], (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          let flatTenancy = result[0][0] as FlatTenancy;
          res(flatTenancy);
        }
      });
    });
  };

  createOrUpdate = async (flatTenancy: FlatTenancy): Promise<FlatTenancy> => {
    const queryString = "CALL `pFlatTenancy_Create_Update`(?, ?, ?, ?, ?, ?);";
    const date = flatTenancy.startDate.toString().split("T")[0];
    return new Promise((res, rej) => {
      conn.query(
        queryString,
        [
          flatTenancy.flatId,
          flatTenancy.userId,
          flatTenancy.rentAmount,
          flatTenancy.securityDeposit,
          flatTenancy.dueDayOfMonth,
          date,
        ],
        (error, result) => {
          if (error) {
            rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
          } else {
            let userTableData = result[0][0] as FlatTenancy;
            res(userTableData);
          }
        }
      );
    });
  };

  endFlatTenancy = async (flatTenancyId: number, endDate: Date): Promise<boolean> => {
    const queryString = "CALL `pFlatTenancy_End_Tenancy`(?, ?);";
    const date = endDate.toString().split("T")[0];
    return new Promise((res, rej) => {
      conn.query(queryString, [flatTenancyId, date], (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          res(result.affectedRows > 0);
        }
      });
    });
  };
}
