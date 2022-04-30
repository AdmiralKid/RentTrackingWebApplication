import { createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const userSelector = createFeatureSelector<UserState>('user');
