import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { PageNotFoundComponent } from './shared/error-handling/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    component: AdminComponent,
    data: {
      configurationName: 'admin',
    }
  },
  {
    path: '',
    loadChildren: () => import('./clients/clients.module').then(mod => mod.ClientsModule),
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
