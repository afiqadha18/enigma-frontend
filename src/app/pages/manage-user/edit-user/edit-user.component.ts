import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ManageUserService } from "../../../services/manage-user.service";import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTableComponent } from "../user-listing/user-table.component";
import { role } from "src/app/model/role.model";
import { Subscription } from 'rxjs';
import { RoleService } from "src/app/services/role.service";
import { User } from "src/app/model/user.model";


@Component({
    templateUrl:'./edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit{
    roleData: role[]=[];
    private rolesubscription!: Subscription;
    user!: User;
    constructor(public dialogref: MatDialogRef<UserTableComponent>, private manageuserservice: ManageUserService, private roleService: RoleService,@Inject(MAT_DIALOG_DATA) private data: {user_Id : string}){}
    ngOnInit() {
        console.log("passed userID: "+ this.data.user_Id);
        this.roleService.getRoles();
        this.rolesubscription = this.roleService.getRolesUpdateAsObservable()
        .subscribe(role => {
            this.roleData = role;
        })

        this.user = this.manageuserservice.getUser(this.data.user_Id) as User;
        console.log("userr get: " + this.user.userID)
        
    }
    onSaveUser(form: NgForm){
        this.manageuserservice.editUser(this.user.userID, form.value.username, form.value.email, form.value.role, form.value.status);
    }
}