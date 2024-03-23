import { Component, OnInit, OnDestroy } from "@angular/core";
import { ManageUserService } from "../../../services/manage-user.service";import { NgForm } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { UserTableComponent } from "../user-listing/user-table.component";
import { role } from "src/app/model/role.model";
import { Subscription } from 'rxjs';
import { RoleService } from "src/app/services/role.service";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{
    roleData: role[]=[];
    private rolesubscription!: Subscription;
    constructor(public dialogref: MatDialogRef<UserTableComponent>, private manageuserservice: ManageUserService, private roleService: RoleService){}
    
    ngOnInit() {
        this.roleService.getRoles();
        this.rolesubscription = this.roleService.getRolesUpdateAsObservable()
        .subscribe((roles: role[] )=> {
            this.roleData = roles;
        })
    }

     onSaveUser(form : NgForm){
        console.log("data from form username: "+form.value.username);
        console.log("data from form email: "+form.value.email);
        console.log("data from form role: "+form.value.role);
        
        this.manageuserservice.addUser(form.value.username, form.value.email, form.value.role);
     }
}