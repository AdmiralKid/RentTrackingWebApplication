import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { User } from "../models/user.model";
import { UserTable } from "../models/userTable";
export class UserDatabase {
  constructor() {}

  createOrUpdateUser = async ({
    uid,
    name,
    phoneNumber,
    email,
    photoURL,
  }: User): Promise<User> => {
    const queryString = "CALL `renttracking`.`pUser_Create_Update`(?,?,?,?,?);";

    return new Promise((res, rej) => {
      conn.query(
        queryString,
        [uid, name, phoneNumber, email, photoURL],
        (error, result) => {
          if (error) {
            rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
          } else {
            let userTableData = result[0][0] as UserTable;
            res(this.mapUserTableToUser(userTableData));
          }
        }
      );
    });
  };

  private mapUserTableToUser = ({
    user_id,
    name,
    phone_number,
    email,
    photo_url,
    user_role_id,
  }: UserTable): User => {
    const user: User = {
      uid: user_id,
      name: name,
      phoneNumber: phone_number,
      email: email,
      photoURL: photo_url,
      userRoleId: user_role_id,
    };
    return user;
  };
}
