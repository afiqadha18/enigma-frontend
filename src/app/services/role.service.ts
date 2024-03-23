import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject ,map } from "rxjs";
import { role } from "../model/role.model";

@Injectable({providedIn: "root"})
export class RoleService{
    constructor(private http :HttpClient, private router: Router){}
    private role: role[] =[];
    private roleUpdated = new Subject<role[]>();

    getRoles(){
        this.http.get<{roles: any[]}>('http://localhost:3001/api/role/getRole')
        .pipe(map((data) =>{
            return data.roles.map(roledata => {
                return {
                    id: roledata.role_id,
                    role: roledata.role,
                    description: roledata.description
                }
            })
        }))
        .subscribe(roles => {
            this.role = roles;
            this.roleUpdated.next([...this.role]);
        })
    }

    getRolesUpdateAsObservable(){
        return this.roleUpdated.asObservable();
    }
}