import { Component, Input, OnInit } from '@angular/core';
import { FlatLookup } from '../../../core/models/flatlookup.model';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.scss']
})
export class FlatListComponent implements OnInit {
  @Input() flat!: FlatLookup;
  constructor() { }

  ngOnInit(): void {
  }

}
