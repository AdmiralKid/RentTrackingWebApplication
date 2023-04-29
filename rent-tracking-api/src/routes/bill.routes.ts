import { Router } from "express";
import { Bill } from "../modules/bill/models/bill.model";
import { APIError, HTTPStatusCode } from "../modules/error/api-error.model";
import { billService } from "../server/services";

const router = Router();
router.get("/:flatTenancyId", async (req, res, next) => {
  try {
    let flatTenancyId: number = +req.params["flatTenancyId"];
    if (!flatTenancyId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid Flat Tenancy Id.");
    }
    let bills = await billService.fetchBillByFlatTenancyId(flatTenancyId);
    return res.json(bills);
  } catch (error) {
    next(error);
  }
});
router.post("/create", async (req, res, next) => {
  try {
    const billReq = req.body as Bill;
    if (!billReq) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid Bill Details.");
    }
    let result = await billService.createbill(billReq);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});
router.delete("/delete/:billId", async (req, res, next) => {
  try {
    let billId: number = +req.params["billId"];
    if (!billId) {
      throw new APIError(HTTPStatusCode.BAD_REQUEST, "Invalid Bill Id.");
    }
    var isDeleted = await billService.deletebill(billId);
    return res.json(isDeleted);
  } catch (error) {
    next(error);
  }
});
export default router;
