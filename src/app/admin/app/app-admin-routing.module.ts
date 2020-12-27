import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../shared/error-handling/page-not-found/page-not-found.component';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../admin.module').then(mod => mod.AdminModule),
    component: AdminComponent,
    data: {
      configurationName: 'admin',
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
export class AppAdminRoutingModule { }
