import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { Apartment } from "../models/apartment.model";
import { ApartmentTable } from "../models/apartmentTable";

export class ApartmentDatabase {
  constructor() {}

  fetchApartmentsbyOwnerID = async (owner_id: String): Promise<Apartment[]> => {
    const queryString = "CALL `pApartment_Get_By_Owner_ID`(?);";
    return new Promise((res, rej) => {
      conn.query(queryString, [owner_id], (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          let rows = this.mapApartmentEntity(result[0] as ApartmentTable[]);
          res(rows);
        }
      });
    });
  };

  private mapApartmentEntity = (apartmentEntities: ApartmentTable[]): Apartment[] => {
    let result: Apartment[] = [];

    apartmentEntities.forEach(({ apartment_id, name, address, owner_id }) => {
      const apartment: Apartment = {
        apartmentId: apartment_id,
        name: name,
        address: address,
        ownerId: owner_id,
      };

      result.push(apartment);
    });

    return result;
  };
}
