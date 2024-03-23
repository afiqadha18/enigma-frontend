import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
// import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { IpTableComponent } from '../../pages/ip-blackhole/ip-table/ip-table.component';
import { IpBlackholeComponent } from 'src/app/pages/ip-blackhole/ip-blackhole.component';
import { BgpPeeringComponent } from 'src/app/pages/bgp-peering/bgp-peering.component';
import { ActivityLogComponent } from 'src/app/pages/activity-log/activity-log.component';
import { IpWhitelistComponent } from 'src/app/pages/ip-whitelist/ip-whitelist.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'ip-blackhole',   component: IpTableComponent},
    { path: 'ip-prefixes',    component: IpBlackholeComponent},
    { path: 'bgp-peering',    component: BgpPeeringComponent},
    { path: 'ip-whitelist',   component: IpWhitelistComponent},
    { path: 'activity-log',   component: ActivityLogComponent}
];
