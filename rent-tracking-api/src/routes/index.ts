import { Router } from "express";
import statusRouter from "./status.routes";
import authRouter from "./auth.routes";
import apartmentRouter from "./apartment.routes";
import adminRouter from "./admin.routes";
import flatRouter from "./flat.routes";
import flatTenancyRouter from "./flat-tenancy.routes";
import tenantRouter from "./tenant.routes";
import lookupRouter from "./lookup.routes";
import billRouter from "./bill.routes";
import { verifyClientUserToken } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();
router.use("/status", statusRouter);
router.use("/auth", verifyClientUserToken, authRouter);
router.use("/apartment", verifyClientUserToken, apartmentRouter);
router.use("/admin", adminMiddleware, adminRouter);
router.use("/flat", verifyClientUserToken, flatRouter);
router.use("/flattenancy", verifyClientUserToken, flatTenancyRouter);
router.use("/tenant", verifyClientUserToken, tenantRouter);
router.use("/lookup", lookupRouter);
router.use("/bill", billRouter);
export default router;
