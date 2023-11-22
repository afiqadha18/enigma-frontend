import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-chart-pie-36',       class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/ip-list',       title: 'IP List',           icon:'nc-bullet-list-67',    class: '' },
    { path: '/bgp-peering',   title: 'BGP Peering',       icon:'nc-cloud-upload-94',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[] = [];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
