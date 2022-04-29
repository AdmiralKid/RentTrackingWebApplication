import { apartmentDatabase } from "../../../server/database";
import { Apartment } from "../models/apartment.model";

export class ApartmentService {
  constructor() {}

  fetchApartmentsbyOwnerID = async (owner_id: String): Promise<Apartment[]> => {
    return await apartmentDatabase.fetchApartmentsbyOwnerID(owner_id);
  };
}
