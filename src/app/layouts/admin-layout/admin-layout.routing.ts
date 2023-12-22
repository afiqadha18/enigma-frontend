import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
// import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { IpTableComponent } from '../../pages/bgp-peering/ip-table/ip-table.component';
import { BgpPeeringComponent } from 'src/app/pages/bgp-peering/bgp-peering.component';
import { UserTableComponent } from 'src/app/pages/manage-user/user-listing/user-table.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'user',           component: UserComponent, canActivate:[AuthGuard] },
    { path: 'icons',          component: IconsComponent, canActivate:[AuthGuard] },
    { path: 'ip-list',        component: IpTableComponent, canActivate:[AuthGuard]},
    { path: 'bgp-peering',      component: BgpPeeringComponent, canActivate:[AuthGuard]},
    { path: 'user-table',      component: UserTableComponent, canActivate:[AuthGuard]},
    { path: 'login',      component: LoginComponent},

];

@NgModule({
    providers: [AuthGuard]
  })
export class AppRoutingModule { }