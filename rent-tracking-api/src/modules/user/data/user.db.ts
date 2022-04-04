import { conn } from "../../../db/mysql.connection";
import { userMappingService } from "../../../server/services";
import { User } from "../models/user.model";
import { UserTable } from "../models/userTable";
export class UserDatabase {
    
    constructor() {}

    createOrUpdateUser = async (user: User): Promise<User> => {
        const queryString = "CALL `renttracking`.`pUser_Create_Update`(?,?,?,?,?);";
        return new Promise((res, rej) => {
            conn.query(
                queryString,
                [
                    user.userId,
                    user.name,
                    user.phoneNumber,
                    user.email,
                    user.photoUrl,
                ],
                (err, result) => {
                    if (err) {
                        console.log("err:", err);
                        rej(err);
                    } else {
                        let userTableData = result[0][0] as UserTable;
                        res(userMappingService.mapUserTableToUser(userTableData));
                    }
                }
            );
        });
    }
}
