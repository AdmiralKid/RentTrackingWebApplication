import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreEntities } from "../../enums/store-entities.enum";
import { getCurrentRoute } from "../router/router.selector";
import { FlatLookupState } from "./flat-lookup.reducers";

export const currentApartmentId = createSelector(getCurrentRoute, state => +state.params?.apartmentId);
export const selectFlatLookupState=createFeatureSelector<FlatLookupState>(StoreEntities.FLATLOOKUP);

export const selectFlatLookup=createSelector(selectFlatLookupState,(flat_lookup)=>flat_lookup.flatLookup);