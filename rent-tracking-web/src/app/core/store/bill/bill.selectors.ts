import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoreEntities } from "../../enums/store-entities.enum";
import { BillState } from "./bill.reducers";

export const selectBillState=createFeatureSelector<BillState>(StoreEntities.BILL);
export const selectBill=createSelector(selectBillState,(billState)=>billState.billList);