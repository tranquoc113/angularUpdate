import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../shared/error-handling/page-not-found/page-not-found.component';
import { ClientsComponent } from '../clients/clients.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../clients.module').then(mod => mod.ClientsModule),
    component: ClientsComponent,
    data: {
      configurationName: 'clients',
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppClientsRoutingModule { }
