import { conn } from "../../../db/mysql.connection";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { User } from "../models/user.model";
import { UserLookup } from "../models/userlookup";
import { UserTable } from "../models/userTable";
export class UserDatabase {
  constructor() {}

  createOrUpdateUser = async ({ uid, name, phoneNumber, email, photoURL, userRoleId }: User): Promise<User> => {
    const queryString = "CALL `renttracking`.`pUser_Create_Update`(?,?,?,?,?,?);";

    return new Promise((res, rej) => {
      conn.query(queryString, [uid, name, phoneNumber, email, photoURL, userRoleId], (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          let userTableData = result[0][0] as UserTable;
          res(this.mapUserTableToUser(userTableData));
        }
      });
    });
  };

  fetchUserByUserId = async (userId: string, roleId: number): Promise<User> => {
    const queryString = "CALL `renttracking`.`pUser_Get_By_UserId`(?, ?);";
    return new Promise((res, rej) => {
      conn.query(queryString, [userId, roleId], (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          let user = result[0][0] as User;
          res(user);
        }
      });
    });
  };

  fetchTenantLookup = async (): Promise<UserLookup[]> => {
    const queryString = "CALL `renttracking`.`pGetTenantLookup`();";
    return new Promise((res, rej) => {
      conn.query(queryString, (error, result) => {
        if (error) {
          rej(new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, error));
        } else {
          let user = result[0] as UserLookup[];
          res(user);
        }
      });
    });
  };

  private mapUserTableToUser = ({ user_id, name, phone_number, email, photo_url, user_role_id }: UserTable): User => {
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
