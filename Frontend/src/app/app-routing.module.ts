import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardProfesorComponent } from './components/dashboard-profesor/dashboard-profesor.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { ActivityAlumnoComponent } from './components/activity-alumno/activity-alumno.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardTutorComponent } from './components/dashboard-tutor/dashboard-tutor.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'; 
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';

import { AuthGuard } from './auth.guard';
import { ProfesorGuard } from './profesor.guard';
import { AdminGuard } from './admin.guard';
import { AlumnoGuard } from './alumno.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AlumnoGuard] },
  { path: 'dashboardProfesor', component: DashboardProfesorComponent, canActivate: [AuthGuard, ProfesorGuard] },
  { path: 'dashboardAdmin', component: DashboardAdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [AuthGuard] },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'activity/:id', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'activityView/:id', component: ActivityViewComponent, canActivate: [AuthGuard] },
  { path: 'activityAlumno/:id', component: ActivityAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'createActivity', component: CreateActivityComponent, canActivate: [AuthGuard, ProfesorGuard] },
  { path: 'dashboardTutor', component: DashboardTutorComponent, canActivate: [AuthGuard] },
  { path: 'changeAvatar', component: ChangeAvatarComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/errorPage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }