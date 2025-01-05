import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardProfesorComponent } from './components/dashboard-profesor/dashboard-profesor.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';

const routes: Routes = [ //maneja que componente se debe cargar para cada ruta
  { path: '', component: LoginComponent }, //para que empiece en el /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path : 'dashboardProfesor', component: DashboardProfesorComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'activity/:id', component: ActivityComponent }, // Ruta dinámica para las actividades
  { path: "**", redirectTo: "/errorPage", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
