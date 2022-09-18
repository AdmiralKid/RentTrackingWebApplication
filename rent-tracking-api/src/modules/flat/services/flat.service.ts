import { flatDatabase } from "../../../server/database";
import { Flat } from "../models/flat.model";
import { FlatLookup } from "../models/flatLookup.model";

export class FlatService {
	constructor() {}

	fetchApartmentsbyOwnerID = async (apartmentId: number, userId: string): Promise<FlatLookup[]> => {
		return await flatDatabase.fetchLookupByApartmentId(apartmentId, userId);
	};

	fetchFlatDetailsByFlatId = async (flatId: number, ownerId: string): Promise<Flat> => {
		return await flatDatabase.fetchFlatByFlatId(flatId, ownerId);
	};
}
