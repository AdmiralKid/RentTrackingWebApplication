import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { loadApartments } from 'src/app/core/store/apartment/apartment.actions';
import { selectApartments } from 'src/app/core/store/apartment/apartment.selectors';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit {
  apartments$ = this.store.select(selectApartments);

  constructor(private snackBar: SnackBarService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadApartments());
  }

  createApartment() {
    this.snackBar.openSnackBar('Apartment Created');
  }
}
