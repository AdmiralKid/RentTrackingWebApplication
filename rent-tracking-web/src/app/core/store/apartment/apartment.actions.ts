import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { ApartmentInt } from '../../models/apartment.model';

export enum ApartmentActions {
  loadApt = '[Apartment] Load Apartment',
  loadAptSuccess = '[Apartment] Load Apartment Success',
  loadAptFailure = '[Apartment] Load Apartment Failure',
}
export const loadApartments = createAction(ApartmentActions.loadApt);

export const loadApartmentsSuccess = createAction(
  ApartmentActions.loadAptSuccess,
  props<{ content: ApartmentInt[] }>()
);

export const loadApartmentsFailure = createAction(
  ApartmentActions.loadAptFailure,
  props<{ errorMessage: string }>()
);
