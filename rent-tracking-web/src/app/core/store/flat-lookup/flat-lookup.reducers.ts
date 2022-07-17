import { createFeature, createReducer, on } from "@ngrx/store";
import { StoreState } from "../../enums/store-state.enum.";
import { FlatLookup } from "../../models/flatlookup.model";
import { loadFlatLookup, loadFlatLookupFailure, loadFlatLookupSuccess } from "./flat-lookup.actions";

export interface FlatLookupState {
  flatLookup: FlatLookup[];
  errors: Array<string>;
  status: StoreState;
}

export const initialState: FlatLookupState = {
  flatLookup: [],
  errors: [],
  status: StoreState.INITIAL
};

export const flatLookupReducer = createReducer(
  initialState,
  on(loadFlatLookup, (state) => ({...initialState, status: StoreState.IN_PROGRESS})),
  on(loadFlatLookupSuccess, (state, {flatLookup}) => ({...state, flatLookup:flatLookup, status:StoreState.SUCCESS})),
  on(loadFlatLookupFailure, (state, {errorMessage}) => ({...state, errors:[errorMessage], status:StoreState.FAILURE})),
);

export const flatLookupFeature = createFeature({
  name: 'flat-lookup',
  reducer: flatLookupReducer,
});