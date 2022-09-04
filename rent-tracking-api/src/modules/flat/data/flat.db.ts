import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { Flat } from "../models/flat.model";
import { FlatLookup } from "../models/flatLookup.model";

export class FlatDatabase {
	constructor() {}
	fetchLookupByApartmentId = async (apartmentId: number, userId: string): Promise<FlatLookup[]> => {
		const queryString = "CALL `renttracking`.`pFlatLookup_By_ApatmentId`(?, ?);";
		return new Promise((res, rej) => {
			conn.query(queryString, [apartmentId, userId], (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let rows = result[0] as FlatLookup[];
					res(rows);
				}
			});
		});
	};

	fetchFlatByFlatId = async (flatId: number, ownerId: string): Promise<Flat> => {
		const queryString = "CALL `renttracking`.`pFlat_Get_By_FlatId`(?, ?);";
		return new Promise((res, rej) => {
			conn.query(queryString, [flatId, ownerId], (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let flatDetails = result[0][0] as Flat;
					res(flatDetails);
				}
			})
		})
	}
}
