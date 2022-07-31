import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreEntities } from '../../enums/store-entities.enum';
import { aptAdapter, ApartmentState } from './apartment.adapter';

const { selectAll } = aptAdapter.getSelectors();

export const selectApartmentsState =
  createFeatureSelector<ApartmentState>(StoreEntities.APARTMENT);

export const selectApartments = createSelector(
  selectApartmentsState,
  selectAll
);
