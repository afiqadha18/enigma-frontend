import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

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
    { path: '/user-table',          title: 'Manage User',      icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit, OnDestroy {
    constructor(private authservice: AuthService){}
    isUserAuthenticated = false;
    private isUserAuthenticatedListener: Subscription | undefined;
    public menuItems: any[] = [];
    ngOnInit() {
        this.isUserAuthenticated = this.authservice.getUserIsAuthenticated();
        this.isUserAuthenticatedListener = this.authservice.getAuthStatusListener()
        .subscribe(isAuth => {
            this.isUserAuthenticated = isAuth;
        });
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    ngOnDestroy(){
        this.isUserAuthenticatedListener?.unsubscribe();
    }
}
