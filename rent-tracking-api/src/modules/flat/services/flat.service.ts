import { flatDatabase } from "../../../server/database";
import { FlatLookup } from "../models/flatLookup.model";

export class FlatService {
	constructor() {}

	fetchApartmentsbyOwnerID = async (apartmentId: number, userId: string): Promise<FlatLookup[]> => {
		return await flatDatabase.fetchLookupByApartmentId(apartmentId, userId);
	};
}
