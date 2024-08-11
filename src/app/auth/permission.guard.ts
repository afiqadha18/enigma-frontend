import {  Injectable, inject } from "@angular/core";
import {   ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, map, mergeMap, of } from "rxjs";
import { role } from "../model/role.model";
import { Router } from "express";

@Injectable()
export class PermissionGuard implements CanActivate{
    constructor(private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        const accessRolesList: string[] =  route.data?.['role'] ?? [];
        //const isAdmin: boolean = isAdmin;
        return this.hasPermission( accessRolesList);
    }
    // type CanMatchFn = (route: Route,  segments: UrlSegment[]) => Observable<boolean> | UrlTree  {
    //     const accessRolesList: role[] = route.data?.['roles'] ?? [];
    //         const isAdmin: boolean = route.data?.['isAdmin'] ?? false;
    //         return this.hasPermission(isAdmin, accessRolesList);
    // }
    
    // CanMatchFn(route: Route): Observable<boolean | UrlTree>{
    //     const accessRolesList: role[] = route.data?.['roles'] ?? [];
    //     const isAdmin: boolean = route.data?.['isAdmin'] ?? false;
    //     return this.hasPermission(isAdmin, accessRolesList);
    // }

    private hasPermission( accessRolesList: string[]){
        return this.authService.getUserLoggedIn().pipe((hasUser) =>{
            if(hasUser){
                // if(isAdmin){
                //     return of(this.authService.checkIsUserAdmin());
                // }else 
                console.log("roles: "+ accessRolesList);
                if(accessRolesList.length > 0){
                    return of(this.authService.checkUserRole(accessRolesList));
                }
                return of(false)
            }else{
                return of(false)
            }
        });
    }

}

// export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
//     return inject(PermissionGuard).canActivate(route.params['role'])? true : inject(Router).createUrlTree(['/login']);
// };