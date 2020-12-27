import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ConfigService } from '../../shared/config/config.service';
import { AppComponent } from './app.component';
import { AppClientsRoutingModule } from './app-clients-routing.module';
import { ClientsModule } from '../clients.module';

// export function initializeApp(configService: ConfigService) {
//   return () => configService.load();
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppClientsRoutingModule,
    HttpClientModule,
    ClientsModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppClientsModule { }
