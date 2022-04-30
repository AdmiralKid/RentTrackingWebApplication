import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  // Private members
  private duration: number = 2 * 1000;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, duration = this.duration) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }
}
