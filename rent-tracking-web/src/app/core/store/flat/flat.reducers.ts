import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreEntities } from '../../enums/store-entities.enum';
import { StoreState } from '../../enums/store-state.enum.';
import { FlatTenancy } from '../../models/flat-tenancy.model';
import { Flat } from '../../models/flat.model';
import { User } from '../../models/user.model';
import {
  loadFlat,
  loadFlatFailure,
  loadFlatSuccess,
  loadFlatTenancy,
  loadFlatTenancyFailure,
  loadFlatTenancySuccess,
  loadTenant,
  loadTenantFailure,
  loadTenantSuccess,
} from './flat.actions';

export interface FlatState {
  flatDetails: { flat?: Flat; flatTenancy?: FlatTenancy; tenant?: User };
  flatDetailsStatus: StoreState;
  flattenancyDetialsStatus: StoreState;
  tenantStatus: StoreState;
  errors: Array<string>;
}

export const initialState: FlatState = {
  flatDetails: { flat: undefined, flatTenancy: undefined, tenant: undefined },
  flatDetailsStatus: StoreState.INITIAL,
  flattenancyDetialsStatus: StoreState.INITIAL,
  tenantStatus: StoreState.INITIAL,
  errors: [],
};

export const flatReducer = createReducer(
  initialState,
  on(loadFlat, (state) => ({
    ...state,
    flatDetailsStatus: StoreState.IN_PROGRESS,
  })),
  on(loadFlatSuccess, (state, { flat }) => ({
    ...state,
    flatDetails: { ...state.flatDetails, flat: flat },
    flatDetailsStatus: StoreState.SUCCESS,
  })),
  on(loadFlatFailure, (state, { errorMessage }) => ({
    ...state,
    errors: [errorMessage],
    flatDetailsStatus: StoreState.FAILURE,
  })),
  on(loadFlatTenancy, (state) => ({
    ...state,
    flattenancyDetialsStatus: StoreState.IN_PROGRESS,
  })),
  on(loadFlatTenancySuccess, (state, { flatTenancy }) => ({
    ...state,
    flatDetails: { ...state.flatDetails, flatTenancy: flatTenancy },
    flattenancyDetialsStatus: StoreState.SUCCESS,
  })),
  on(loadFlatTenancyFailure, (state, { errorMessage }) => ({
    ...state,
    errors: [errorMessage],
    flattenancyDetialsStatus: StoreState.FAILURE,
  })),
  on(loadTenant, (state) => ({
    ...state,
    tenantStatus: StoreState.IN_PROGRESS,
  })),
  on(loadTenantSuccess, (state, { tenant }) => ({
    ...state,
    flatDetails: { ...state.flatDetails, tenant: tenant },
    tenantStatus: StoreState.SUCCESS,
  })),
  on(loadTenantFailure, (state, { errorMessage }) => ({
    ...state,
    errors: [errorMessage],
    tenantStatus: StoreState.FAILURE,
  }))
);

export const flatFeature = createFeature({
  name: StoreEntities.FLAT,
  reducer: flatReducer,
});
