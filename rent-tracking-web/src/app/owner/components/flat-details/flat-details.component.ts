import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flat } from '../../../core/models/flat.model';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.scss']
})
export class FlatDetailsComponent implements OnInit {
  @Input() flat!: Observable<Flat| undefined>;
  constructor() { }

  ngOnInit(): void {
  }

}
