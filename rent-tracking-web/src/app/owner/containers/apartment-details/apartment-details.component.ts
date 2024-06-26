import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { loadFlatLookup } from '../../../core/store/flat-lookup/flat-lookup.actions';
import {
  currentApartmentId,
  selectFlatLookup,
} from '../../../core/store/flat-lookup/flat-lookup.selectors';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
})
export class ApartmentDetailsComponent implements OnInit, OnDestroy {
  subsink = new SubSink();
  flatLookup$ = this.store.select(selectFlatLookup);
  currentApartmentId$: Observable<number> = of(-1);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentApartmentId$ = this.store.select(currentApartmentId);
    this.subsink.sink = this.currentApartmentId$.subscribe((apartmentId) => {
      if (apartmentId && apartmentId !== -1) {
        this.store.dispatch(loadFlatLookup({ apartmentId: apartmentId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
