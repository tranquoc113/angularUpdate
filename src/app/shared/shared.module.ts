import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { ConfigModule } from './config/config.module';
import { ShareMaterialModule } from './sharematerial.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigModule,
    ErrorHandlingModule,
    ShareMaterialModule
  ]
})
export class SharedModule { }
