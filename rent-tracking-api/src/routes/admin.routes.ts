import { Router } from "express";
import { Claim, ClaimString } from "../modules/admin/model/claim.enum";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { adminService } from "../server/services";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "Connected to Admin" });
});
router.post("/setclaims", async (req, res, next) => {
  try {
    const { emailid, claimtype } = req.body as {
      emailid: string;
      claimtype: string;
    };
    if (!(claimtype && emailid)) {
      throw new APIError(
        HTTPStatusCode.BAD_REQUEST,
        "Missing claimtype or emailid."
      );
    }

    const claim = Claim[claimtype.toUpperCase() as ClaimString];

    if (!claim) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid Claim type.");
    }
    await adminService.setCustomClaim(emailid, claim);
    res.json({ message: "Successfully added the claims." });
  } catch (err) {
    next(err);
  }
});
router.get("/getClaims", async (req, res, next) => {
  try {
    const { emailid } = req.body as { emailid: string };
    var result = await adminService.getCustomClaim(emailid);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;