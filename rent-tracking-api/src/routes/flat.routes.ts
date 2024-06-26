import { Router } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { flatService } from "../server/services";

const router = Router();
router.get("/flatlookup/:apartmentId", async (req, res, next) => {
  try {
    let apartmentId: number = +req.params["apartmentId"];
    if (!apartmentId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid apartment ID.");
    }
    const decodedToken = res.locals["decodedToken"] as DecodedIdToken;
    const userId = decodedToken.uid;
    let flatLoopup = await flatService.fetchApartmentsbyOwnerID(
      apartmentId,
      userId
    );
    if (flatLoopup.length === 0) {
      return res
        .status(HTTPStatusCode.NOT_FOUND)
        .json({ message: "No flats found" });
    }
    return res.json(flatLoopup);
  } catch (err) {
    next(err);
  }
});

router.get("/details/:flatId", async (req, res, next) => {
  try {
    let flatId: number = +req.params["flatId"];
    if (!flatId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid flat Id.");
    }
    const decodedToken = res.locals["decodedToken"] as DecodedIdToken;
    const userId = decodedToken.uid;
    let flatDetails = await flatService.fetchFlatDetailsByFlatId(
      flatId,
      userId
    );
    if (!flatDetails) {
      return res
        .status(HTTPStatusCode.NOT_FOUND)
        .json({ message: "Flat Details not found." });
    }
    return res.json(flatDetails);
  } catch (err) {
    next(err);
  }
});
export default router;
