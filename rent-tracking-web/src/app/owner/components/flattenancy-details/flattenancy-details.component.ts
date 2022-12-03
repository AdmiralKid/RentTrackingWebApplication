import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlatTenancy } from '../../../core/models/flat-tenancy.model';

@Component({
  selector: 'app-flattenancy-details',
  templateUrl: './flattenancy-details.component.html',
  styleUrls: ['./flattenancy-details.component.scss']
})
export class FlattenancyDetailsComponent implements OnInit {
  @Input() flatTenancy!: Observable<FlatTenancy| undefined>;
  constructor() { }

  ngOnInit(): void {
  }

}
