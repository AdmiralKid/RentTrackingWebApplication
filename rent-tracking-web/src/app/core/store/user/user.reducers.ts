import { getSelectors } from '@ngrx/router-store';
import { createReducer, on } from '@ngrx/store';
import { StoreState } from '../../enums/store-state.enum.';
import { User } from '../../models/user.model';
import {
  googleSignin,
  googleSigninFailure,
  googleSigninSuccess,
  loadUserFailure,
  loadUserSuccess,
  reloadUserStateSuccess,
} from './user.actions';

export const { selectCurrentRoute } = getSelectors();

export interface UserState {
  user: User | null;
  GoogleSignInState: StoreState;
  UserEntityState: StoreState;
  errorMessages: Array<string>;
}
export const initialState: UserState = {
  user: null,
  GoogleSignInState: StoreState.INITIAL,
  UserEntityState: StoreState.INITIAL,
  errorMessages: [],
};
export const userReducer = createReducer(
  initialState,

  on(googleSignin, (state: UserState) => ({
    ...state,
    GoogleSignInState: StoreState.IN_PROGRESS,
  })),

  on(googleSigninSuccess, (state: UserState) => ({
    ...state,
    GoogleSignInState: StoreState.SUCCESS,
  })),

  on(googleSigninFailure, (state, action) => ({
    ...state,
    GoogleSignInState: StoreState.FAILURE,
    errorMessages: [action.errorMessage],
  })),

  on(loadUserSuccess, (state, props) => {
    let changedState = {
      ...state,
      user: props.user,
      UserEntityState: StoreState.SUCCESS,
    };
    localStorage.setItem('userState', JSON.stringify(changedState));
    return changedState;
  }),

  on(loadUserFailure, (state, action) => ({
    ...state,
    UserEntityState: StoreState.FAILURE,
    errorMessages: [action.errorMessage],
  })),

  on(reloadUserStateSuccess, (state, action) => ({ ...state, ...action.user }))
);
