import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { UsersComponent } from './users.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    UserManagmentComponent,
    UsersComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
