import { createAction, props } from '@ngrx/store';
import { FlatTenancy } from '../../models/flat-tenancy.model';
import { Flat } from '../../models/flat.model';
import { User } from '../../models/user.model';

export enum FlatActions {
  LOAD_FLAT = '[Flat] Load Flat',
  LOAD_FLAT_SUCCESS = '[Flat] Load Flat Success',
  LOAD_FLAT_FAILURE = '[Flat] Load Flat Failure',
  LOAD_FLATTENANCY = '[FlatTenancy] Load FlatTenancy',
  LOAD_FLATTENANCY_SUCCESS = '[FlatTenancy] Load FlatTenancy Success',
  LOAD_FLATTENANCY_FAILURE = '[FlatTenancy] Load FlatTenancy Failure',
  LOAD_TENANT = '[Tenant] Load Tenant',
  LOAD_TENANT_SUCCESS = '[Tenant] Load Tenant Success',
  LOAD_TENANT_FAILURE = '[Tenant] Load Tenant Failure',
}

export const loadFlat = createAction(
  FlatActions.LOAD_FLAT,
  props<{ flatId: number }>()
);
export const loadFlatSuccess = createAction(
  FlatActions.LOAD_FLAT_SUCCESS,
  props<{ flat: Flat }>()
);
export const loadFlatFailure = createAction(
  FlatActions.LOAD_FLAT_FAILURE,
  props<{ errorMessage: string }>()
);

export const loadFlatTenancy = createAction(
  FlatActions.LOAD_FLATTENANCY,
  props<{ tenantId: string }>()
);
export const loadFlatTenancySuccess = createAction(
  FlatActions.LOAD_FLATTENANCY_SUCCESS,
  props<{ flatTenancy: FlatTenancy }>()
);
export const loadFlatTenancyFailure = createAction(
  FlatActions.LOAD_FLATTENANCY_FAILURE,
  props<{ errorMessage: string }>()
);

export const loadTenant = createAction(
  FlatActions.LOAD_TENANT,
  props<{ tenantId: string }>()
);
export const loadTenantSuccess = createAction(
  FlatActions.LOAD_TENANT_SUCCESS,
  props<{ tenant: User }>()
);
export const loadTenantFailure = createAction(
  FlatActions.LOAD_TENANT_FAILURE,
  props<{ errorMessage: string }>()
);
