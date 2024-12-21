import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [LoginComponent],
})
export class AuthModule {}
