import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApartmentInt } from 'src/app/core/models/apartment.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { loadApartments } from 'src/app/core/store/apartment/apartment.actions';
import { selectAllApts } from 'src/app/core/store/apartment/apartment.selectors';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements DoCheck, OnInit {
  apartments: ApartmentInt[] = [];
  newApartment: ApartmentInt[] = [];
  aptName: string = '';
  aptAddress: string = '';
  aptOwner: string = '';
  apartments$=this.store.select(selectAllApts);

  constructor(private _snackBar: SnackBarService, private store: Store) {}

  getValue(value: any) {
    this.aptName = value.aptName;
    this.aptAddress = value.aptAddress;
    this.aptOwner = value.aptOwner;
    console.log('Values Fetched');
  }

  ngDoCheck(): void {}

  ngOnInit(): void {
    this.store.dispatch(loadApartments());
  }

  submit() {
    this._snackBar.openSnackBar('Apartment Created');
  }
}
