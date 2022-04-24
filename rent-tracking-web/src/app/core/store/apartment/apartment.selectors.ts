import { createFeatureSelector, createSelector } from '@ngrx/store';
import { aptAdapter, AptState } from './apartment.adapter';

const { selectAll } = aptAdapter.getSelectors();

export const selectAptState = createFeatureSelector<AptState>('apartments');

export const selectAllApts = createSelector(selectAptState, selectAll);
