import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  currentFlatId,
  currentTenantId,
  selectFlatDetails,
  selectFlatTenancyDetails,
  selectTenantDetails,
} from '../../../core/store/flat/flat.selectors';
import { SubSink } from 'subsink';
import {
  loadFlat,
  loadFlatTenancy,
  loadTenant,
} from '../../../core/store/flat/flat.actions';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss'],
})
export class FlatComponent implements OnInit, OnDestroy {
  subsink = new SubSink();
  currentFlatId$: Observable<number> = of(-1);
  currentTenantId$: Observable<string> = of('');
  flatDetails$ = this.store.select(selectFlatDetails);
  flatTenancyDetials$ = this.store.select(selectFlatTenancyDetails);
  tenantDetails$ = this.store.select(selectTenantDetails);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentFlatId$ = this.store.select(currentFlatId);
    this.subsink.sink = this.currentFlatId$.subscribe((flatId) => {
      if (flatId && flatId !== -1) {
        this.store.dispatch(loadFlat({ flatId }));
      }
    });
    this.currentTenantId$ = this.store.select(currentTenantId);
    this.subsink.sink = this.currentTenantId$.subscribe((tenantId) => {
      if (tenantId && tenantId !== '') {
        this.store.dispatch(loadFlatTenancy({ tenantId }));
        this.store.dispatch(loadTenant({ tenantId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
