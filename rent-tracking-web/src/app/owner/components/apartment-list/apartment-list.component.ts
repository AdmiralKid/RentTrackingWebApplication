import { Component, Input, OnInit } from '@angular/core';
import { Apartment } from '../../../core/models/apartment.model';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit {
  @Input() apartment!: Apartment;

  constructor() {}

  ngOnInit(): void {}
}
