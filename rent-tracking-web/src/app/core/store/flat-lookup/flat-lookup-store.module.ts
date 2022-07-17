import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FlatLookupEffects } from "./flat-lookup.effects";
import { flatLookupFeature } from "./flat-lookup.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(flatLookupFeature),
    EffectsModule.forFeature([FlatLookupEffects]),
  ],
})
export class FlatLookupStoreModule {}
