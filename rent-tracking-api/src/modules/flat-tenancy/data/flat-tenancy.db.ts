import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { FlatTenancy } from "../models/flat-tenancy.model";

export class FlatTenancyDatabase {
    constructor() {}
	fetchFlatTenancyByTenantId = async (tenantId: string, ownerId: string): Promise<FlatTenancy> => {
		const queryString = "CALL `renttracking`.`pFlatTenancy_Get_By_TenantId`(?, ?);";
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
}