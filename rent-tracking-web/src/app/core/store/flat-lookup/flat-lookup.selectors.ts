import { createSelector } from "@ngrx/store";
import { getCurrentRoute } from "../router/router.selector";

export const currentApartmentId = createSelector(getCurrentRoute, state => +state.params?.apartmentId);