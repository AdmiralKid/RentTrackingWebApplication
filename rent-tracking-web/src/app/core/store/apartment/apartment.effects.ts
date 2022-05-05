import { ApartmentListService } from './../../services/apartment-list.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadApartmentsSuccess,
  loadApartmentsFailure,
  loadApartments,
} from './apartment.actions';

@Injectable()
export class ApartmentEffects {
  constructor(
    private action$: Actions,
    private aptService: ApartmentListService
  ) {}

  loadApartments$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadApartments),
      mergeMap(() =>
        this.aptService.apartments$.pipe(
          map((apartments) =>
            loadApartmentsSuccess({
              content: apartments,
            })
          )
        )
      ),
      catchError((error) =>
        of(
          loadApartmentsFailure({
            errorMessage: `Could not load apartments,\n${JSON.stringify(
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
