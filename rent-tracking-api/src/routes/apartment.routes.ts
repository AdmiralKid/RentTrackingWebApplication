import { Router } from "express";
import { DecodedToken } from "../modules/user/models/decodedIdToken.model";
import { apartmentService } from "../server/services";

const router = Router();

router.get("/", async (_, res) => {
  let decodedToken = res.locals["decodedToken"] as DecodedToken;

  const ownerId = decodedToken.uid;

  const getApartment = await apartmentService.fetchApartmentsbyOwnerID(ownerId);

  res.json(getApartment);
});

export default router;
