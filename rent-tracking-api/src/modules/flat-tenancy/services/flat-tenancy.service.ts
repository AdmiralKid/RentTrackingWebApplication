import { flatTenancyDatabase } from "../../../server/database";
import { FlatTenancy } from "../models/flat-tenancy.model";

export class FlatTenancyService {
	constructor() {}

	fetchFlatTenancyByTenantId  = async (tenantId: string, userId: string): Promise<FlatTenancy> => {
		return await flatTenancyDatabase.fetchFlatTenancyByTenantId(tenantId, userId);
	};

	createOrUpdate = async (flatTenancy: FlatTenancy) : Promise<FlatTenancy> => {
		return await flatTenancyDatabase.createOrUpdate(flatTenancy);
	}
}