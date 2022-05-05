import { StoreState } from '../../enums/store-state.enum.';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { Apartment } from '../../models/apartment.model';

export const aptAdapter = createEntityAdapter<Apartment>({
  selectId: (apartment: Apartment) => apartment.apartmentId,
});

export interface ApartmentState extends EntityState<Apartment> {
  errors: Array<string>;
  status: StoreState;
}
