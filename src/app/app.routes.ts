import { inject } from '@angular/core';
import { RedirectCommand, Router, Routes } from '@angular/router';
import { Welcome } from './prelogin/welcome/welcome';
import { AuthService } from './service/auth.service';
import { Refer } from './refer/refer';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    children: [
      {
        path: '',
        component: Refer,
      }
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./postlogin/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [
      () => {
        const router = inject(Router);
        const authService = inject(AuthService);
        if (!authService.isCustomer()) {
          const loginPath = router.parseUrl('/login');
          return new RedirectCommand(loginPath);
        }
        return true;
      },
    ],
    loadChildren:() => import('./postlogin/dashboard/dashboard.routes').then((m)=> m.routes)
  },
  {
    path: '**',
    redirectTo: '',
  },
];
