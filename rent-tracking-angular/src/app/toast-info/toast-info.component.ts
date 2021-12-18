import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ToastService } from './../shared/services/toast.service';

@Component({
  selector: 'app-toast-info',
  templateUrl: './toast-info.component.html',
  styleUrls: ['./toast-info.component.css'],
})
export class ToastInfoComponent implements DoCheck {
  message: string = '';
  bgColor: string = '';
  show: boolean = false;
  data: any;
  constructor(private _toastService: ToastService) {}

  ngDoCheck(): void {
    this.data = this._toastService.getMessage();
    this.message = this.data[0];
    this.show = this.data[1];
    this.bgColor = this.data[2];
  }
}
