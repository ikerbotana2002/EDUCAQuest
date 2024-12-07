// src/app/app.routes.ts
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';  // Asegúrate de crear este componente


export const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // Ruta a la página de inicio
];
