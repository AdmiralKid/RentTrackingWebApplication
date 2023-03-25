import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { tap } from 'rxjs';
import { FlatLookup } from '../../../core/models/flatlookup.model';
import { BillService } from '../../../core/services/bill.service';
import { LookupService } from '../../../core/services/lookup.service';

@Component({
  selector: 'app-create-bill-dialog',
  templateUrl: './create-bill-dialog.component.html',
  styleUrls: ['./create-bill-dialog.component.scss'],
})
export class CreateBillDialogComponent implements OnInit {
  billFormGroup = this.fb.group({
    flatTenancyId: this.fb.control(0),
    receiverId: this.fb.control('', [Validators.required]),
    amount: this.fb.control(null, [Validators.required]),
    billTypeId: this.fb.control(null, [Validators.required]),
    paymentMethodId: this.fb.control(null, [Validators.required]),
    paymentDate: this.fb.control('', [Validators.required]),
    comments: this.fb.control(''),
  });

  receivers$ = this.lookup.fetchAllOwner$();
  billTypes$ = this.lookup.fetchAllBillType$();
  paymentMethods$ = this.lookup.fetchAllPaymentMethod$();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { flatLookup: FlatLookup },
    private fb: FormBuilder,
    private lookup: LookupService,
    private billService: BillService,
    private dialog: MatDialogRef<CreateBillDialogComponent>
  ) {}

  ngOnInit(): void {
    this.billFormGroup.patchValue({
      flatTenancyId: this.data.flatLookup.flatTenancyId,
    });
  }

  submit() {
    if (this.billFormGroup.valid) {
      this.billService.createBill(this.billFormGroup.value).subscribe(
        (data) => {
          this.dialog.close();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
