import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertToUTC(date: Date) {
    const res = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return res;
  }
}
