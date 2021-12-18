import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message: string = '';
  show = false;
  bgColor: string = '';
  setMessage(message: string, show: boolean, bgColor: string) {
    this.show = show;
    this.message = message;
    this.bgColor = bgColor;

  }
  getMessage() {
    return [this.message, this.show, this.bgColor];
  }
}
