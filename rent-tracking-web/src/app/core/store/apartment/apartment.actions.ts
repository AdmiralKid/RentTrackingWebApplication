import { createAction, props } from '@ngrx/store';

import { Apartment } from '../../models/apartment.model';

export enum ApartmentActions {
  LOAD_APARTMENT = '[Apartment] Load Apartment',
  LOAD_APARTMENT_SUCCESS = '[Apartment] Load Apartment Success',
  LOAD_APARTMENT_FAILURE = '[Apartment] Load Apartment Failure',
}
export const loadApartments = createAction(ApartmentActions.LOAD_APARTMENT);

export const loadApartmentsSuccess = createAction(
  ApartmentActions.LOAD_APARTMENT_SUCCESS,
  props<{ content: Apartment[] }>()
);

export const loadApartmentsFailure = createAction(
  ApartmentActions.LOAD_APARTMENT_FAILURE,
  props<{ errorMessage: string }>()
);
