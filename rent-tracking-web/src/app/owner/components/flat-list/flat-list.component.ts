import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatLookup } from '../../../core/models/flatlookup.model';
import { AssignTenantDialogComponent } from '../assign-tenant-dialog/assign-tenant-dialog.component';

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
    this.dialog.open(AssignTenantDialogComponent);
  }
}
