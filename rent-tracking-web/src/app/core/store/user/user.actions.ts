import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserState } from './user.reducers';

export enum UserActions {
  googleSignin = '[User] Google SignIn',
  googleSigninSuccess = '[User] Google SignIn Success',
  googleSigninFailure = '[User] Google SignIn Failure',
  loadUser = '[User] Load User',
  loadUserSuccess = '[User] Load User Success',
  loadUserFailure = '[User] Load User Failure',
  reloadUserState = '[User] ReLoad User State',
  reloadUserStateSuccess = '[User] ReLoad User State Success'
}

export const googleSignin = createAction(UserActions.googleSignin);

export const googleSigninSuccess = createAction(
  UserActions.googleSigninSuccess
);

export const googleSigninFailure = createAction(
  UserActions.googleSigninFailure,
  props<{errorMessage: string}>()
);

export const loadUser = createAction(
  UserActions.loadUser,
  props<{token: string}>()
);

export const loadUserSuccess = createAction(
  UserActions.loadUserSuccess,
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  UserActions.loadUserFailure,
  props<{errorMessage: string}>()
);
export const reloadUserState = createAction(
  UserActions.reloadUserState
);
export const reloadUserStateSuccess = createAction(
  UserActions.reloadUserStateSuccess,
  props<{ user: UserState }>()
);