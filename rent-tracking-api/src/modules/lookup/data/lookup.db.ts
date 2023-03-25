import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { UserLookup } from "../../user/models/userlookup";
import { BillType } from "../models/bill-type.model";
import { PaymentMethodType } from "../models/payment-type.model";

export class LookupDatabase {
	constructor() {}
	fetchAllBillType = async (): Promise<BillType[]> => {
		const queryString =
			"SELECT bt.bill_type_id as billTypeId, bt.name as `name` FROM bill_type bt;";
		return new Promise((res, rej) => {
			conn.query(queryString, (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let rows = result as BillType[];
					res(rows);
				}
			});
		});
	};

	fetchAllPaymentMethodType = async (): Promise<PaymentMethodType[]> => {
		const queryString =
			"SELECT pm.payment_method_id as paymentMethodId, pm.name as `name` FROM payment_method pm;";
		return new Promise((res, rej) => {
			conn.query(queryString, (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let rows = result as PaymentMethodType[];
					res(rows);
				}
			});
		});
	};

	fetchAllOwners = async (): Promise<UserLookup[]> => {
		const queryString =
			"SELECT user_id as uid, name, email from `user` where user_role_id = 1";
		return new Promise((res, rej) => {
			conn.query(queryString, (error, result) => {
				if (error) {
					rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
				} else {
					let rows = result as UserLookup[];
					res(rows);
				}
			});
		});
	};
}
