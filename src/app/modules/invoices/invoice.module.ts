import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDashboardComponent } from './invoice/invoice-dashboard/invoice-dashboard.component';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [{ path: '', component: InvoiceDashboardComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule,MaterialModule, RouterModule.forChild(routes)],
})
export class InvoiceModule {}
