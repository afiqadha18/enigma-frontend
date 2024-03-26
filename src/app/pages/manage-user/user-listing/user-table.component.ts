import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "../../../model/user.model";
import { NgForm } from "@angular/forms";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddUserComponent } from "../add-user/add-user.component";
import { ManageUserService } from "../../../services/manage-user.service";

import { Subscription } from 'rxjs';
import { EditUserComponent } from "../edit-user/edit-user.component";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

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
        this.manageuserservice.deleteUser(userID)
        .subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: "Submitted",
              text: res.message,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                    const updateduser = this.manageuserservice.user.filter( user => user.userID !== userID);
                    this.manageuserservice.user = updateduser;
                    this.manageuserservice.userUpdated.next([...this.manageuserservice.user]);
              }
            });
        },
          (error) => {
            console.log(error);
            console.log('status code: ' + error.status);
            Swal.fire({
              title: error.statusText,
              text: error.error.error,
              icon: 'error',
              showCloseButton: true,
              showConfirmButton: false
            })
          });;
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

