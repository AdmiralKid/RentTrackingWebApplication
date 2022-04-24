import { EntityStateEnum } from './../../models/enums/entityState';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { ApartmentInt } from '../../models/apartment.model';

const selectApartmentID = (apartment: ApartmentInt) => apartment.apartmentID;

export const aptAdapter = createEntityAdapter<ApartmentInt>({
  selectId: selectApartmentID,
});

export interface AptState extends EntityState<ApartmentInt>{
  errorMessages: Array<string>,
  status: EntityStateEnum,
}