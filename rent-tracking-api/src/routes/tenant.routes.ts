import { Router } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { UserRole } from "../modules/user/models/user.model";
import { userService } from "../server/services";

const router = Router();
router.get("/details/:tenantId", async (req, res, next) => {
  try {
    let tenantId: string = req.params["tenantId"];
    if (!tenantId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid tenant ID.");
    }
    let tenant = await userService.fetchUserByuserId(tenantId, UserRole.TENANT);
    if (!tenant) {
      return res
        .status(HTTPStatusCode.NOT_FOUND)
        .json({ message: "No tenant Details records found" });
    }
    return res.json(tenant);
  } catch (err) {
    next(err);
  }
});
router.get("/tenantlookup", async (req, res, next) => {
  try {
    let tenantlookup = await userService.fetchTenantLookup();
    if (!tenantlookup) {
      return res
        .status(HTTPStatusCode.NOT_FOUND)
        .json({ message: "No tenant Details records found" });
    }
    return res.json(tenantlookup);
  } catch (err) {
    next(err);
  }
});
export default router;
