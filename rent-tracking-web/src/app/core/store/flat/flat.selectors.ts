import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreEntities } from "../../enums/store-entities.enum";
import { selectFlatLookup } from "../flat-lookup/flat-lookup.selectors";
import { getCurrentRoute } from "../router/router.selector";
import { FlatState } from "./flat.reducers";

export const currentFlatId = createSelector(getCurrentRoute, state => +state.params?.flatId);
export const currentTenantId = createSelector(getCurrentRoute, state => state.params?.tenantId);
export const selectFlatState = createFeatureSelector<FlatState>(StoreEntities.FLAT);
export const selectFlatDetails = createSelector(selectFlatState, (state) => state.flatDetails.flat);
export const selectFlatTenancyDetails = createSelector(selectFlatState, (state) => state.flatDetails.flatTenancy);
export const selectTenantDetails = createSelector(selectFlatState, (state) => state.flatDetails.tenant);