import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesComponent } from './entries.component';
import { MenuPageModule } from 'src/app/components/menuPage/menuPage.module';

@NgModule({
  imports: [
    CommonModule,
    MenuPageModule
  ],
  declarations: [EntriesComponent]
})
export class EntriesModule { }
