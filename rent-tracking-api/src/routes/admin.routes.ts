import { Router } from "express";
import { Claim } from "../modules/admin/model/claim.enum";
import { adminService } from "../server/services";

const router = Router();

router.get("/", (_, res) => {
    res.json({ message: "Connected to Admin" });
});
router.post("/setclaims", async (req, res, next) => {
    try {
        const { emailid, claimtype } = req.body as {
            emailid: string;
            claimtype: Claim;
        };
        await adminService.setCustomClaim(emailid, claimtype);
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
