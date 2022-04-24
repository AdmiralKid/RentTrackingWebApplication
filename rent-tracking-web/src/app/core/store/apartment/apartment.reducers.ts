import { aptAdapter, AptState } from './apartment.adapter';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadApartments,
  loadApartmentsFailure,
  loadApartmentsSuccess,
} from './apartment.actions';
import { EntityStateEnum } from '../../models/enums/entityState';

export const initialState: AptState = aptAdapter.getInitialState({
  errorMessages: [],
  status: EntityStateEnum.INITIAL,
});

export const apartmentReducer = createReducer(
  initialState,
  on(loadApartments, (state) => ({
    ...state,
    status: EntityStateEnum.IN_PROGRESS,
  })),
  on(loadApartmentsSuccess, (state, { content }) => {
    return aptAdapter.setAll(content, {
      ...state,
      status: EntityStateEnum.SUCCESS,
    });
  }),
  on(loadApartmentsFailure, (state, { errorMessage }) => ({
    ...state,
    status: EntityStateEnum.FAILURE,
    errorMessages: [errorMessage],
  }))
);

export const apartmentFeature = createFeature({
  name: 'apartments',
  reducer: apartmentReducer,
});
