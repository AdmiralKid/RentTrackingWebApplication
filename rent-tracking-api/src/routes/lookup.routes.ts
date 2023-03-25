import { Router } from "express";
import { lookupService } from "../server/services";

const router = Router();
router.get("/billtype", async (req, res, next) => {
  try {
    let billtype = await lookupService.fetchAllBillType();
    return res.json(billtype);
  } catch (error) {
    next(error);
  }
});
router.get("/paymentmethod", async (req, res, next) => {
  try {
    let paymentmethod = await lookupService.fetchAllPaymentMethodType();
    return res.json(paymentmethod);
  } catch (error) {
    next(error);
  }
});
router.get("/owner", async (req, res, next) => {
  try {
    let owners = await lookupService.fetchAllOwner();
    return res.json(owners);
  } catch (error) {
    next(error);
  }
});
export default router;
