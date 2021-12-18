import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastInfoComponent } from './toast-info.component';

@NgModule({
  declarations: [ToastInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports:[ToastInfoComponent],
  bootstrap:[ToastInfoComponent]
})
export class ToastModule {}
