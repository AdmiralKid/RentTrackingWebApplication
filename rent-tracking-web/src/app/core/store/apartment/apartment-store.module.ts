import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { apartmentFeature } from './apartment.reducers';
import { ApartmentEffects } from './apartment.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(apartmentFeature),
    EffectsModule.forFeature([ApartmentEffects]),
  ],
})
export class ApartmentStoreModule {}
