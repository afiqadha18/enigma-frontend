import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { FirstTimeLoginComponent } from './pages/login/first-time-login/first-time-login.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // { path: 'firstTimeLogin/:userID',      
  //   component: FirstTimeLoginComponent, 
  //   canActivate:[AuthGuard]},
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  //{ path: 'login',      component: LoginComponent}, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
 
]
