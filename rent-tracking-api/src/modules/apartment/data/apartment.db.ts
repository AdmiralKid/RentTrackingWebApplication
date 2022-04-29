import { conn } from "../../../db/mysql.connection";
import { Apartment } from "../models/apartment.model";
import { ApartmentTable } from "../models/apartmentTable";
export class ApartmentDatabase {
  constructor() {}

  fetchApartmentsbyOwnerID = async (owner_id: String): Promise<Apartment[]> => {
    const queryString = "CALL `renttracking`.`pApartment_Get_By_Owner_ID`(?);";
    return new Promise((res, rej) => {
      conn.query(queryString, [owner_id], (err, result) => {
        if (err) {
          console.log("Error:", err);
          rej(err);
        } else {
          let rows = this.mapApartmentEntity(result[0] as ApartmentTable[]);
          res(rows);
        }
      });
    });
  };

  private mapApartmentEntity = (
    apartmentEntities: ApartmentTable[]
  ): Apartment[] => {
    let result: Apartment[] = [];
    apartmentEntities.forEach((element) => {
      const apartment: Apartment = {
        apartmentID: element.apartment_id,
        name: element.name,
        address: element.address,
        ownerID: element.owner_id,
      };
      result.push(apartment);
    });
    return result;
  };
}
