import { createAction, props } from '@ngrx/store';
import { Bill } from '../../models/bill.model';

export enum BillActions {
  LOAD_BILL = '[Bill] Load Bill',
  LOAD_BILL_SUCCESS = '[Bill] Load Bill Success',
  LOAD_BILL_FAILURE = '[Bill] Load Bill Failure',
}
export const loadBill = createAction(
  BillActions.LOAD_BILL,
  props<{ flatTenancyId: number }>()
);

export const loadBillSuccess = createAction(
  BillActions.LOAD_BILL_SUCCESS,
  props<{ billList: Bill[] }>()
);

export const loadBillFailure = createAction(
  BillActions.LOAD_BILL_FAILURE,
  props<{ errorMessage: string }>()
);
