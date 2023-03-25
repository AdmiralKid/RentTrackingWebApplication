import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { billFeature } from './bill.reducers';
import { BillEffects } from './bill.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(billFeature),
    EffectsModule.forFeature([BillEffects]),
  ],
})
export class BillStoreModule {}
