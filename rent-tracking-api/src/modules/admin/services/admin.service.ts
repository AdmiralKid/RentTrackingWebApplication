import { getAuth } from "firebase-admin/auth";
import { APIError, HTTPStatusCode } from "../../error/api-error.model";
import { Claim } from "../model/claim.enum";


export class AdminService {
    constructor() {}
    setCustomClaim = async (emailId: string, claimType: Claim) => {
        try {
            const user = await getAuth().getUserByEmail(emailId);
            await getAuth().setCustomUserClaims(user.uid, {
                [claimType]: true,
            });
        } catch (error) {
            throw new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, 'Set Custom Claims failed');
        }
    };

    getCustomClaim = async (emailId: string) => {
        try{
            const user = await getAuth().getUserByEmail(emailId);
            return user.customClaims;
        } catch (error) {
            throw new APIError(HTTPStatusCode.INTERNAL_SERVER_ERROR, 'Get Custom Claims failed');;
        }
    }
}
