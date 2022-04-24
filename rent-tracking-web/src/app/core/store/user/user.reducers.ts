import { state } from '@angular/animations';
import { getSelectors } from '@ngrx/router-store';
import { createReducer, on } from '@ngrx/store';
import { EntityStateEnum } from '../../models/enums/entityState';
import { User } from '../../models/user.model';
import {
  googleSignin,
  googleSigninFailure,
  googleSigninSuccess,
  loadUserFailure,
  loadUserSuccess,
  reloadUserState,
  reloadUserStateSuccess,
} from './user.actions';
export const { selectCurrentRoute } = getSelectors();
export interface UserState {
  user: User | null;
  GoogleSignInState: EntityStateEnum;
  UserEntityState: EntityStateEnum;
  errorMessages: Array<string>;
}
export const initialState: UserState = {
  user: null,
  GoogleSignInState: EntityStateEnum.INITIAL,
  UserEntityState: EntityStateEnum.INITIAL,
  errorMessages: [],
};
export const userReducer = createReducer(
  initialState,
  on(googleSignin, (state: UserState) => ({
    ...state,
    GoogleSignInState: EntityStateEnum.IN_PROGRESS,
  })),
  on(googleSigninSuccess, (state: UserState) => ({
    ...state,
    GoogleSignInState: EntityStateEnum.SUCCESS,
  })),
  on(googleSigninFailure, (state, action) => ({
    ...state,
    GoogleSignInState: EntityStateEnum.FAILURE,
    errorMessages: [action.errorMessage],
  })),
  on(loadUserSuccess, (state, props) => {
    let changedState = {
      ...state,
      user: props.user,
      UserEntityState: EntityStateEnum.SUCCESS,
    };
    localStorage.setItem('userState', JSON.stringify(changedState));
    return changedState;
  }),
  on(loadUserFailure, (state, action) => ({
    ...state,
    UserEntityState: EntityStateEnum.FAILURE,
    errorMessages: [action.errorMessage],
  })),
  on(reloadUserStateSuccess, (state, props) => ({ ...state, ...props.user }))
);
