import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { FlatLookup } from "../models/flatLookup.model";

export class FlatDatabase {
	constructor() {}
    fetchLookupByApartmentId = async (apartmentId: number): Promise<FlatLookup[]> => {
		const queryString = "CALL `renttracking`.`pFlatLookup_By_ApatmentId`(?);";
		return new Promise((res, rej) => {
			conn.query(queryString, [apartmentId], (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let rows = result[0] as FlatLookup[];
					res(rows);
				}
			});
		});
	};
    
}