import { createFeatureSelector } from '@ngrx/store';
import { StoreEntities } from '../../enums/store-entities.enum';
import { UserState } from './user.reducers';

export const userSelector = createFeatureSelector<UserState>(StoreEntities.USER);
