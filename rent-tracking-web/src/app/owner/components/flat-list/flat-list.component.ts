import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatLookup } from '../../../core/models/flatlookup.model';
import { AssignTenantDialogComponent } from '../assign-tenant-dialog/assign-tenant-dialog.component';
import { CreateBillDialogComponent } from '../create-bill-dialog/create-bill-dialog.component';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.scss'],
})
export class FlatListComponent implements OnInit {
  @Input() flat!: FlatLookup;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  assignTenant() {
    this.dialog.open(AssignTenantDialogComponent, {
      minWidth: '450px',
      data: {
        flat: this.flat,
      },
    });
  }

  createBill() {
    this.dialog.open(CreateBillDialogComponent, {
      minWidth: '450px',
      data: {
        flatLookup: this.flat,
      },
    });
  }
}
