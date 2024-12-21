import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './core/header/header.component';
import { LeftbarComponent } from './core/leftbar/leftbar.component';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './modules/auth/auth.module';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderInterceptor } from './core/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftbarComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, AuthModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
