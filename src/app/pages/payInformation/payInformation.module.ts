import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayInformationComponent } from './payInformation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PayInformationComponent]
})
export class PayInformationModule { }
