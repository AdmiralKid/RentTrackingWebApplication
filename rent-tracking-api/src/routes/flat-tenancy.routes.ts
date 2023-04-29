import { Router } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { FlatTenancy } from "../modules/flat-tenancy/models/flat-tenancy.model";
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

router.post("/modify", async (req, res, next) => {
  try {
    const flatTenancyReq = req.body as FlatTenancy;
    let flatTenancy = await flatTenancyService.createOrUpdate(flatTenancyReq);
    return res.json(flatTenancy);
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post("/endtenancy", async (req, res, next) =>{
	try {
		const {flattenancyid, enddate} = req.body as { flattenancyid : number, enddate: Date};
		if (!(flattenancyid && enddate)) {
			throw new APIError(
			  HTTPStatusCode.BAD_REQUEST,
			  "Missing flattenancyid or enddate."
			);
		}
		let isSuccess = await flatTenancyService.endTenancy(flattenancyid, enddate);
		res.send(isSuccess)
	} catch (err) {
    next(err);
  }
})

export default router;