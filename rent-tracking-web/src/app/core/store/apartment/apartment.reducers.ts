import { aptAdapter, ApartmentState } from './apartment.adapter';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadApartments,
  loadApartmentsFailure,
  loadApartmentsSuccess,
} from './apartment.actions';
import { StoreState } from '../../enums/store-state.enum.';
import { StoreEntities } from '../../enums/store-entities.enum';

export const initialState: ApartmentState = aptAdapter.getInitialState({
  errors: [],
  status: StoreState.INITIAL,
});

export const apartmentReducer = createReducer(
  initialState,
  on(loadApartments, (state) => ({
    ...state,
    status: StoreState.IN_PROGRESS,
  })),
  on(loadApartmentsSuccess, (state, { content }) => {
    return aptAdapter.setAll(content, {
      ...state,
      status: StoreState.SUCCESS,
    });
  }),
  on(loadApartmentsFailure, (state, { errorMessage }) => ({
    ...state,
    status: StoreState.FAILURE,
    errors: [errorMessage],
  }))
);

export const apartmentFeature = createFeature({
  name: StoreEntities.APARTMENT,
  reducer: apartmentReducer,
});
