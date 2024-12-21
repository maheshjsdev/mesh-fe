import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeDashboardComponent } from './practice-dashboard/practice-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [{ path: '', component: PracticeDashboardComponent }];

@NgModule({
  declarations: [PracticeDashboardComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class PracticesModule {}
