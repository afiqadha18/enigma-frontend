import { Component, OnInit, OnDestroy } from "@angular/core";
import { ManageUserService } from "../../../services/manage-user.service";
import { FormBuilder, FormGroup, FormControl, NgForm } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { UserTableComponent } from "../user-listing/user-table.component";
import { role } from "src/app/model/role.model";
import { Subscription } from 'rxjs';
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{
    roleData: role[]=[];
    private rolesubscription!: Subscription;
    postSalaryForm!: FormGroup;
    constructor(public dialogref: MatDialogRef<UserTableComponent>, private manageuserservice: ManageUserService, private roleService: RoleService,private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.roleService.getRoles();
        this.rolesubscription = this.roleService.getRolesUpdateAsObservable()
        .subscribe((roles: role[] )=> {
            this.roleData = roles;
        })
        this.postSalaryForm = this.formBuilder.group({
            userID: new FormControl(),
            username: new FormControl(),
            email: new FormControl(),
            role: new FormControl(),
            status: new FormControl()
          })
    }

     onSaveUser(){
        console.log("data from form username: "+this.postSalaryForm.value.username);
        console.log("data from form email: "+this.postSalaryForm.value.email);
        console.log("data from form role: "+this.postSalaryForm.value.role);
        
        this.manageuserservice.addUser(this.postSalaryForm.value.username, this.postSalaryForm.value.email, this.postSalaryForm.value.role)
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
                        // .subscribe(response => {
        //     console.log("user ID: " +response.userID);
        //     console.log("firstTimeLogin: " +response.firstTimeLogin);
        //     console.log("status: " +response.status);
        //     user.userID = response.userID;
        //     this.user.push(user);
        //     this.userUpdated.next([...this.user]);
        //     //this.router.navigate(["/user"]);

        // })
                this.dialogref.close();
                console.log("userid: "+ res.userID);
                this.postSalaryForm.value.userID =  res.userID;
                //let updatedUserIndex = this.manageuserservice.user.findIndex(a => a.userID == this.postSalaryForm.value.userID);
                //this.manageuserservice.user.splice(updatedUserIndex, 1, this.postSalaryForm.value);
                this.manageuserservice.user.push(this.postSalaryForm.value);
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
          });
     }

     onNoClick(): void {
        this.dialogref.close();
      }
}