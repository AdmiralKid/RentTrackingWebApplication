import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreEntities } from '../../enums/store-entities.enum';
import { StoreState } from '../../enums/store-state.enum.';
import { Bill } from '../../models/bill.model';
import { loadBill, loadBillFailure, loadBillSuccess } from './bill.actions';

export interface BillState {
  billList: Bill[];
  errors: Array<string>;
  status: StoreState;
}

export const initialState: BillState = {
  billList: [],
  errors: [],
  status: StoreState.INITIAL,
};
export const billReducer = createReducer(
  initialState,
  on(loadBill, (state) => ({
    ...initialState,
    status: StoreState.IN_PROGRESS,
  })),
  on(loadBillSuccess, (state, { billList }) => ({
    ...state,
    billList: billList,
    status: StoreState.SUCCESS,
  })),
  on(loadBillFailure, (state, { errorMessage }) => ({
    ...state,
    errors: [errorMessage],
    status: StoreState.FAILURE,
  }))
);

export const billFeature = createFeature({
  name: StoreEntities.BILL,
  reducer: billReducer,
});
