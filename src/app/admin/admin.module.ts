import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule { }
