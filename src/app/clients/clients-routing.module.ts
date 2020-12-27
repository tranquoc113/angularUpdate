import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/error-handling/page-not-found/page-not-found.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
