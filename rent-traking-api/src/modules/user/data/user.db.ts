import { conn } from "../../../db/mysql.connection";
import { userMappingService } from "../../../server/services";
import { User } from "../models/user.model";
import { UserTable } from "../models/userTable";
export class UserDatabase {
    constructor() {}
    async createOrUpdateUser(user: User): Promise<User> {
        return new Promise((res, rej) => {
            conn.query(
                "CALL `renttracking`.`pUser_Create_Update`(?,?,?,?,?);",
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
                        console.log(user);
                    }
                }
            );
        });
    }
}
