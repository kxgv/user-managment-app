import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'users', component:  UsersComponent},
      { path: 'user-managment', component: UserManagmentComponent},
      { path: 'user-managment/:id', component: UserManagmentComponent},
      { path: '**', redirectTo: 'users'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
