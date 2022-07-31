import { createAction, props } from '@ngrx/store';
import { FlatLookup } from '../../models/flatlookup.model';
export enum FlatLookupActions {
  LOAD_FLATLOOKUP = '[FlatLookup] Load FlatLookup',
  LOAD_FLATLOOKUP_SUCCESS = '[FlatLookup] Load FlatLookup Success',
  LOAD_FLATLOOKUP_FAILURE = '[FlatLookup] Load FlatLookup Failure',
}
export const loadFlatLookup = createAction(
  FlatLookupActions.LOAD_FLATLOOKUP,
  props<{ apartmentId: number }>()
);

export const loadFlatLookupSuccess = createAction(
  FlatLookupActions.LOAD_FLATLOOKUP_SUCCESS,
  props<{ flatLookup: FlatLookup[] }>()
);

export const loadFlatLookupFailure = createAction(
  FlatLookupActions.LOAD_FLATLOOKUP_FAILURE,
  props<{ errorMessage: string }>()
);
