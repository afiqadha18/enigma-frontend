import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
// import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { IpTableComponent } from '../../pages/bgp-peering/ip-table/ip-table.component';
import { BgpPeeringComponent } from 'src/app/pages/bgp-peering/bgp-peering.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'ip-list',        component: IpTableComponent},
    { path: 'bgp-peering',      component: BgpPeeringComponent},

];
