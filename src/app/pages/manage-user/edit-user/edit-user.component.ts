import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ManageUserService } from "../../../services/manage-user.service";
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTableComponent } from "../user-listing/user-table.component";
import { role } from "src/app/model/role.model";
import { Subscription } from 'rxjs';
import { RoleService } from "src/app/services/role.service";
import { User } from "src/app/model/user.model";
import Swal from "sweetalert2";


@Component({
    templateUrl:'./edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit{
    [x: string]: any;
    roleData: role[]=[];
    private rolesubscription!: Subscription;
    user!: User;
    editUserForm!: FormGroup;
    constructor(public dialogref: MatDialogRef<EditUserComponent>, private manageuserservice: ManageUserService, private roleService: RoleService,@Inject(MAT_DIALOG_DATA) private data: {user_Id : string},private formBuilder: FormBuilder){}
    ngOnInit() {
        console.log("passed userID: "+ this.data.user_Id);
        this.roleService.getRoles();
        this.rolesubscription = this.roleService.getRolesUpdateAsObservable()
        .subscribe(role => {
            this.roleData = role;
        })

        this.user = this.manageuserservice.getUser(this.data.user_Id) as User;
        console.log("userr get: " + this.user.userID)
        this.editUserForm = this.formBuilder.group({
            userID: new FormControl({ value: this.user.userID, disabled: false }),
            username: new FormControl({ value: this.user.username, disabled: false }),
            email: new FormControl({ value: this.user.email, disabled: false }),
            role: new FormControl({ value: this.user.role, disabled: false }),
            status: new FormControl({ value: this.user.status, disabled: false })
          })
        
    }
    onSaveUser(){
        this.manageuserservice.editUser(this.user.userID, this.editUserForm.value.username, this.editUserForm.value.email, this.editUserForm.value.role, this.editUserForm.value.status)
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
                // this.router.navigate(['/bgp-peering']);
                this.dialogref.close();
                console.log("userid: "+ this.editUserForm.value.userID);
                let updatedUserIndex = this.manageuserservice.user.findIndex(a => a.userID == this.editUserForm.value.userID);
                this.manageuserservice.user.splice(updatedUserIndex, 1, this.editUserForm.value);
                this.manageuserservice.userUpdated.next([...this.manageuserservice.user]);
              }
            });
        },
          (error) => {
            console.log(error);
            console.log('status code: ' + error.status);
            Swal.fire({
              title: error.statusText,
              text: error.error.message,
              icon: 'error',
              showCloseButton: true,
              showConfirmButton: false
            })
          });
    }

    onNoClick(): void {
        this.dialogref.close();
      }
}