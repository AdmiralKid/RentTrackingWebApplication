import { Router } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { flatTenancyService } from "../server/services";

const router = Router();
router.get("/details/:tenantId", async (req, res, next) => {
  try {
    let tenantId: string = req.params["tenantId"];
    if (!tenantId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid tenant ID.");
    }
    const decodedToken = res.locals["decodedToken"] as DecodedIdToken;
    const userId = decodedToken.uid;
    let flatTenancy = await flatTenancyService.fetchFlatTenancyByTenantId(
      tenantId,
      userId
    );
    if (!flatTenancy) {
      return res
        .status(HTTPStatusCode.NOT_FOUND)
        .json({ message: "No flat tenancy records found" });
    }
    return res.json(flatTenancy);
  } catch (err) {
    next(err);
  }
});
export default router;