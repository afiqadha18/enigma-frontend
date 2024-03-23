import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "../../../model/user.model";
import { NgForm } from "@angular/forms";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddUserComponent } from "../add-user/add-user.component";
import { ManageUserService } from "../../../services/manage-user.service";

import { Subscription } from 'rxjs';
import { EditUserComponent } from "../edit-user/edit-user.component";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector:'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit, OnDestroy{
    
    constructor(private manageuserservice: ManageUserService, private dialog:MatDialog){}

    displayedColumns: string[] = ['position', 'Username', 'Role', 'E-mail','action'];
    userData: User[]=[];
    private usersubscription!: Subscription;


    ngOnInit(): void {
        this.manageuserservice.getAllUser();
        this.usersubscription = this.manageuserservice.getUserUpdateAsObservable()
        .subscribe((userDatas: User[]) =>{
            this.userData= userDatas;
            console.log("user Component: "+ this.userData.length)
        });
    }

    deleteSalary(userID : string){
        this.manageuserservice.deleteUser(userID);
    }

    addUserDialog(){
        const dialogref = this.dialog.open(AddUserComponent, {});
        dialogref.afterClosed().subscribe(result => {
        console.log('dialog closed');
        })
    }

    editUserDialog(userID : string){
        console.log("user Id: "+userID);
        const dialogref = this.dialog.open(EditUserComponent, {
            data:{
                user_Id: userID
            }
        });
        dialogref.afterClosed().subscribe(result => {
        console.log('dialog closed');
        })
    }

    ngOnDestroy(): void {
        this.usersubscription.unsubscribe();
    }

    
}

