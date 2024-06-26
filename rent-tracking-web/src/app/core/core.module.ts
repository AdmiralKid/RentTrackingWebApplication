import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user/user.reducers';
import { UserEffects } from './store/user/user.effects';
import { StoreEntities } from './enums/store-entities.enum';
import { CustomSerializer } from './store/router/custom-route-serializer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        [StoreEntities.ROUTER]: routerReducer,
        [StoreEntities.USER]: userReducer,
      },
      {}
    ),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class CoreModule {}
