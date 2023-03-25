import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { first, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Bill } from '../../../core/models/bill.model';
import { BillService } from '../../../core/services/bill.service';
import { loadBill } from '../../../core/store/bill/bill.actions';
import { selectBill } from '../../../core/store/bill/bill.selectors';
import { FlatTenancy } from '../../../core/models/flat-tenancy.model';
import { selectFlatTenancyDetails } from '../../../core/store/flat/flat.selectors';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss'],
})
export class BillingHistoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'paymentDate',
    'receiverName',
    'billType',
    'paymentMethod',
    'amount',
  ];
  billingHistory$?: Observable<Bill[]>;
  sub?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectFlatTenancyDetails).subscribe((data) => {
      if (data?.flatTenancyId) {
        this.store.dispatch(loadBill({ flatTenancyId: data.flatTenancyId }));
      }
    });
    this.billingHistory$ = this.store.select(selectBill);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
