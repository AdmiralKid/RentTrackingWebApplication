import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BillService } from '../../services/bill.service';
import { loadBill, loadBillFailure, loadBillSuccess } from './bill.actions';

@Injectable()
export class FlatLookupEffects {
  constructor(private action$: Actions, private billService: BillService) {}

  loadFlatLookup$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadBill),
      mergeMap(({ flatTenancyId }) =>
        this.billService
          .billByFlatTenancyId$(flatTenancyId)
          .pipe(map((billList) => loadBillSuccess({ billList })))
      ),
      catchError((error) =>
        of(
          loadBillFailure({
            errorMessage: `Could not load Bills,\n${JSON.stringify(
              error,
              undefined,
              2
            )}`,
          })
        )
      )
    )
  );
}
