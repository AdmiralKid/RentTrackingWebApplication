import { Router } from "express";
import { apartmentService } from "../server/services";

const router = Router();

router.get("/getbyownerid/:id", async (_, res) => {
  const _ownerid = String(_.params.id);
  const getApartment = await apartmentService.fetchApartmentsbyOwnerID(
    _ownerid
  );
  if (!getApartment) {
    res.status(204).send("Apartments not found.");
  } else {
    res.json(getApartment);
  }
});

export default router;
