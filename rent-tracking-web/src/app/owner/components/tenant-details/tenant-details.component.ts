import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss'],
})
export class TenantDetailsComponent implements OnInit {
  @Input() tenant!: Observable<User | undefined>;

  constructor() {}

  ngOnInit(): void {}
}
