import { ApartmentListService } from './../../services/apartment-list.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ApartmentActions,
  loadApartmentsSuccess,
  loadApartmentsFailure,
} from './apartment.actions';

@Injectable()
export class ApartmentEffects {
  constructor(
    private action$: Actions,
    private aptService: ApartmentListService
  ) {}

  loadApartments$ = createEffect(() =>
    this.action$.pipe(
      ofType(ApartmentActions.loadApt),
      mergeMap(() =>
        this.aptService.fetchApartments().pipe(
          map((apartments) =>
            loadApartmentsSuccess({
              content: apartments,
            })
          )
        )
      ),
      catchError((e) =>
        of(
          loadApartmentsFailure({
            errorMessage: `Could not load apartments, ${JSON.stringify(e)}`,
          })
        )
      )
    )
  );
}
