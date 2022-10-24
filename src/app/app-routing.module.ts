import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module')
    .then(module => module.LoginModule),
    canActivate:[CheckLoginGuard],
  },
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module')
    .then(module => module.UsersModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
