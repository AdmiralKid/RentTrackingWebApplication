import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Flat } from '../../../core/models/flat.model';
import { FlatLookup } from '../../../core/models/flatlookup.model';
import { FlatTenancyService } from '../../../core/services/flattenancy.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-assign-tenant-dialog',
  templateUrl: './assign-tenant-dialog.component.html',
  styleUrls: ['./assign-tenant-dialog.component.scss']
})
export class AssignTenantDialogComponent implements OnInit {

  tenants$ = this.userService.tenantsLookup$;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { flat: FlatLookup }, private flatTenancy: FlatTenancyService, private fb: FormBuilder, public dialogRef: MatDialogRef<AssignTenantDialogComponent>) { }

  assignTenantForm = this.fb.group({
    flatId: this.fb.control(null, [Validators.required]),
    userId: this.fb.control(null, [Validators.required]),
    securityDeposit: this.fb.control(null, [Validators.required]),
    rentAmount: this.fb.control(null, [Validators.required]),
    dueDayOfMonth: this.fb.control(null, [Validators.required]),
    startDate: this.fb.control("", [Validators.required])
  })

  ngOnInit(): void {
    this.assignTenantForm.patchValue({ flatId: this.data.flat.flatId })
  }

  submit() {
    this.flatTenancy.updateFlatTenancyDetails(this.assignTenantForm.value)
    this.dialogRef.close();
  }


}
