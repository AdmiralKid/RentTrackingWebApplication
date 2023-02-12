import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FlatService } from '../../services/flat.service';
import { FlatTenancyService } from '../../services/flattenancy.service';
import { UserService } from '../../services/user.service';
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

@Injectable()
export class FlatEffects {
  constructor(
    private action$: Actions,
    private flatService: FlatService,
    private flatTenancyService: FlatTenancyService,
    private userService: UserService
  ) { }
  loadFlat$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadFlat),
      mergeMap(({ flatId }) =>
        this.flatService
          .flatDetailsByFlatId$(flatId)
          .pipe(map((flat) => loadFlatSuccess({ flat })))
      ),
      catchError((error) =>
        of(
          loadFlatFailure({
            errorMessage: `Could not load flat details, \n${JSON.stringify(
              error,
              undefined,
              2
            )}`,
          })
        )
      )
    )
  );

  loadFlatTenancy$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadFlatTenancy),
      mergeMap(({ tenantId }) =>
        this.flatTenancyService
          .flatTenancyDetailsByTenantId$(tenantId)
          .pipe(map((flatTenancy) => loadFlatTenancySuccess({ flatTenancy })))
      ),
      catchError((error) =>
        of(
          loadFlatTenancyFailure({
            errorMessage: `Could not load flat tenancy details, \n${JSON.stringify(
              error,
              undefined,
              2
            )}`,
          })
        )
      )
    )
  );

  loadTenant$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadTenant),
      mergeMap(({ tenantId }) =>
        this.userService
          .tenantDetailsByTenantId(tenantId)
          .pipe(map((tenant) => loadTenantSuccess({ tenant })))
      ),
      catchError((error) =>
        of(
          loadTenantFailure({
            errorMessage: `Could not load tenant details, \n${JSON.stringify(
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
