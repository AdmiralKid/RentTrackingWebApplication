import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FlatEffects } from "./flat.effects";
import { flatFeature } from "./flat.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(flatFeature),
    EffectsModule.forFeature([FlatEffects]),
  ],
})
export class FlatStoreModule {}
