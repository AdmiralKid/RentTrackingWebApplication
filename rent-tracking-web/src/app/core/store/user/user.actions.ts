import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserState } from './user.reducers';

export enum UserActions {
  GOOGLE_SIGNIN = '[User] Google SignIn',
  GOOGLE_SIGNIN_SUCCESS = '[User] Google SignIn Success',
  GOOGLE_SIGNIN_FAILURE = '[User] Google SignIn Failure',
  LOAD_USER = '[User] Load User',
  LOAD_USER_SUCCESS = '[User] Load User Success',
  LOAD_USER_FAILURE = '[User] Load User Failure',
  RELOAD_USER = '[User] ReLoad User State',
  RELOAD_USER_SUCCESS = '[User] ReLoad User State Success',
  LOGOUT_USER = '[User] Logout',
  LOGOUT_USER_SUCCESS = '[User] Logout Success',
}

export const googleSignin = createAction(UserActions.GOOGLE_SIGNIN);

export const googleSigninSuccess = createAction(
  UserActions.GOOGLE_SIGNIN_SUCCESS
);

export const googleSigninFailure = createAction(
  UserActions.GOOGLE_SIGNIN_FAILURE,
  props<{ errorMessage: string }>()
);

export const loadUser = createAction(
  UserActions.LOAD_USER,
  props<{ token: string }>()
);

export const loadUserSuccess = createAction(
  UserActions.LOAD_USER_SUCCESS,
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  UserActions.LOAD_USER_FAILURE,
  props<{ errorMessage: string }>()
);

export const reloadUserState = createAction(UserActions.RELOAD_USER);

export const reloadUserStateSuccess = createAction(
  UserActions.RELOAD_USER_SUCCESS,
  props<{ user: UserState }>()
);

export const logOutUser = createAction(UserActions.LOGOUT_USER);

export const logOutUserSuccess = createAction(UserActions.LOGOUT_USER_SUCCESS);
