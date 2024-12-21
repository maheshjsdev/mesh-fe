import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [{ path: '', component: UserDashboardComponent }];

@NgModule({
  declarations: [UserDashboardComponent, UserFormComponent],
  imports: [CommonModule,MaterialModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
