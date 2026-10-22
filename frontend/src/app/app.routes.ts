import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((page) => page.Login),
    title: 'Login | ServiceDesk',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((page) => page.Dashboard),
    title: 'Dashboard | ServiceDesk',
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/users/users').then((page) => page.Users),
    title: 'Usuarios | ServiceDesk',
  },
];
