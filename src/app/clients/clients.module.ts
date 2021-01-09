import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErrorHandlingModule } from '../shared/error-handling/error-handling.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ShareMaterialModule } from '../shared/sharematerial.module';

@NgModule({
  declarations: [
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    ErrorHandlingModule,
  ],
  bootstrap: [ClientsComponent],
})
export class ClientsModule { }
