import { apartmentDatabase } from "../../../server/database";
import { Apartment } from "../models/apartment.model";

export class ApartmentService {
	constructor() {}

	fetchApartmentsbyOwnerID = async (owner_id: String): Promise<Apartment[]> => {
		try {
			return await apartmentDatabase.fetchApartmentsbyOwnerID(owner_id);
		} catch (error) {
			throw error;
		}
	};
}
