import { createFeatureSelector, createSelector } from '@ngrx/store';
import { aptAdapter, ApartmentState } from './apartment.adapter';

const { selectAll } = aptAdapter.getSelectors();

export const selectApartmentsState =
  createFeatureSelector<ApartmentState>('apartments');

export const selectApartments = createSelector(
  selectApartmentsState,
  selectAll
);
