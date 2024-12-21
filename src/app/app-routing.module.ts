import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { authGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/users/user.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/practices/practices.module').then(
        (m) => m.PracticesModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./modules/invoices/invoice.module').then((m) => m.InvoiceModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
