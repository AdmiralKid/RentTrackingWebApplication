import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FlatService } from "../../services/flat.service";
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadFlatLookup, loadFlatLookupFailure, loadFlatLookupSuccess } from "./flat-lookup.actions";
@Injectable()
export class FlatLookupEffects {
  constructor(
    private action$: Actions,
    private flatService: FlatService
  ) {}

  loadFlatLookup$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadFlatLookup),
      mergeMap(({apartmentId}) =>
        this.flatService.flatLookupByApartmentId$(apartmentId).pipe(
          map((flatlookup) =>
            loadFlatLookupSuccess({
              flatLookup: flatlookup,
            })
          )
        )
      ),
      catchError((error) =>
        of(
          loadFlatLookupFailure({
            errorMessage: `Could not load flat lookup,\n${JSON.stringify(
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
