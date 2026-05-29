import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [
  // 1. Default route: if they type localhost:4200, send them to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. The three main pages
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminComponent },
  
  // 3. Catch-all: if they type a random URL, send them back to login
  { path: '**', redirectTo: 'login' }
];