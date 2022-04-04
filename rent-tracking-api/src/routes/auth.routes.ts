import { Router } from "express";
import { userService } from "../server/services";
import { verifyClientUserToken } from "../middleware/auth.middleware";
import { DecodedToken } from "../modules/user/models/decodedIdToken.model";
import { User } from "../modules/user/models/user.model";
const router = Router();

router.get("/", verifyClientUserToken, async (_, res, next) => {
    let decodedToken = res.locals["decodedToken"] as DecodedToken;
    try{
        const user : User = await userService.createOrUpdateUser(decodedToken);
        res.json(user);
    }
    catch(error){
        next(error);
    }    
});

export default router;
