import { DecodedIdToken } from "firebase-admin/auth";

export interface DecodedToken extends DecodedIdToken {
    name: string;
    picture: string;
}
