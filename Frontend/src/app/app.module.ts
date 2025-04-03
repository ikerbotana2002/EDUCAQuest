import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RegisterComponent } from './components/register/register.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardProfesorComponent } from './components/dashboard-profesor/dashboard-profesor.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';

// animaciones del toast
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './utils/token.interceptor';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatRadioModule } from '@angular/material/radio';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { ActivityAlumnoComponent } from './components/activity-alumno/activity-alumno.component';
import { DashboardTutorComponent } from './components/dashboard-tutor/dashboard-tutor.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    RegisterComponent,
    MaintenanceComponent,
    ErrorPageComponent,
    DashboardProfesorComponent,
    ActivityComponent,
    DashboardAdminComponent,
    CreateActivityComponent,
    ActivityAlumnoComponent,
    DashboardTutorComponent,
    ChangeAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000, //duracion de la ventana del error y posicion (y que no salgan varios)
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
