import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apartment } from '../../../core/models/apartment.model';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
  @Output() submitApartment = new EventEmitter<Apartment>();
  apartmentForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.apartmentForm = fb.group({
      apartmentId: fb.control(''),
      name: fb.control(''),
      address: fb.control(''),
      ownerId: fb.control(''),
    });
  }

  ngOnInit(): void {}

  submit() {
    this.submitApartment.emit(this.apartmentForm.value);
  }
}
