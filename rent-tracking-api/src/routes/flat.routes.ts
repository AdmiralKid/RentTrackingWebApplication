import { Router } from "express";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { flatService } from "../server/services";

const router = Router();
router.get("/flatlookup/:apartmentId", async (req, res, next) => {
    try {
        let apartmentId: number = +req.params['apartmentId'];
        if (!apartmentId) {
            throw new APIError(
                HTTPStatusCode.BAD_REQUEST,
                "Invalid apartment ID."
              );
        }
        let flatLoopup = await flatService.fetchApartmentsbyOwnerID(apartmentId);
        res.json(flatLoopup);
    }
    catch (err) {
        next(err);
    }
});
export default router; 