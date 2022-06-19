import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { UserRole } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';
import {
  googleSigninFailure,
  googleSigninSuccess,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  logOutUserSuccess,
  reloadUserState,
  reloadUserStateSuccess,
  UserActions,
} from './user.actions';
import { initialState, UserState } from './user.reducers';

@Injectable()
export class UserEffects implements OnInitEffects {
  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GOOGLE_SIGNIN),
      mergeMap(() =>
        this.authService.googleLogin().pipe(
          mergeMap((data) => {
            if (data.user === null || data.user === undefined) {
              return of(googleSigninFailure({ errorMessage: 'null' }));
            } else return [googleSigninSuccess(), loadUser()];
          }),
          catchError(() =>
            of(
              googleSigninFailure({
                errorMessage: 'Failed to SignIn to Google.',
              })
            )
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USER),
      mergeMap(() => {
        return this.authService.createOrUpdateUser().pipe(
          map((user) => {
            this._snackBar.openSnackBar(`Logged in as ${user.email}`);
            return loadUserSuccess({ user });
          }),
          catchError(() =>
            of(loadUserFailure({ errorMessage: 'Failed to Load User' }))
          )
        );
      })
    )
  );

  loadUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadUserSuccess),
        tap(({ user }) => {
          if (user.userRoleId == UserRole.OWNER)
            this.router.navigate(['/owner/dashboard/']);
          else {
            this.authService.logout();
            this._snackBar.openSnackBar(`Your Account is not Active. Please Contact Admin.`, 5000);
            this.router.navigate(['']);
          }
        })
      ),
    { dispatch: false }
  );

  reloadUserState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.RELOAD_USER),
      mergeMap(() => {
        let userLocalState = localStorage.getItem('userState');
        let parsedUser: UserState = initialState;
        if (userLocalState != null) {
          parsedUser = JSON.parse(userLocalState);
        }
        return of(reloadUserStateSuccess({ user: parsedUser }));
      })
    )
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOGOUT_USER),
      mergeMap(() =>
        this.authService.logout().pipe(map(() => logOutUserSuccess()))
      )
    )
  );

  logOutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.LOGOUT_USER_SUCCESS),
        tap(() => {
          this._snackBar.openSnackBar('Logged Out');
          localStorage.clear();
          this.router.navigate(['/home/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _snackBar: SnackBarService
  ) {}

  ngrxOnInitEffects(): Action {
    return reloadUserState();
  }
}
