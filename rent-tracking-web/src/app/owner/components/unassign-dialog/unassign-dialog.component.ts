import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlatLookup } from '../../../core/models/flatlookup.model';
import { FlatTenancyService } from '../../../core/services/flattenancy.service';
import { Store } from '@ngrx/store';
import { currentApartmentId } from '../../../core/store/flat-lookup/flat-lookup.selectors';
import { first } from 'rxjs';
import { loadFlatLookup } from '../../../core/store/flat-lookup/flat-lookup.actions';

@Component({
  selector: 'app-unassign-dialog',
  templateUrl: './unassign-dialog.component.html',
  styleUrls: ['./unassign-dialog.component.scss'],
})
export class UnassignDialogComponent implements OnInit {
  endDate?: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { flatLookup: FlatLookup },
    private flatTenancyService: FlatTenancyService,
    private store: Store,
    private dialogRef: MatDialogRef<UnassignDialogComponent>
  ) {}

  ngOnInit(): void {}

  unassign() {
    console.log('EndDate', this.endDate);
    if (this.endDate) {
      this.flatTenancyService
        .endTenancy(this.data.flatLookup.flatTenancyId, this.endDate)
        .subscribe(() => {
          this.store
            .select(currentApartmentId)
            .pipe(first())
            .subscribe((apartmentId) => {
              this.store.dispatch(loadFlatLookup({ apartmentId }));
            });
          this.dialogRef.close();
        });
    }
  }
}
