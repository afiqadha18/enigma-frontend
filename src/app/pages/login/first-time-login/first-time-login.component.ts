import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ManageUserService } from "src/app/services/manage-user.service";
import Swal from "sweetalert2";

@Component({
    templateUrl: './first-time-login.component.html',
    styleUrls: ['./first-time-login.component.css']
})
export class FirstTimeLoginComponent implements OnInit{
    private userID = '';
    errorMessage="";
    constructor(private route:ActivatedRoute, private manageUser: ManageUserService, private authService: AuthService){}
    
    ngOnInit(): void {
        this.route.params.subscribe((param: Params) => {this.userID = param['userID']})
        console.log("user id: "+this.userID);
         
    }


    onSavePassword(form: NgForm){
        console.log("password: "+ form.value.password);
        console.log("repassword: "+ form.value.rePassword);
        if(form.value.password === form.value.rePassword){
            this.authService.firstTimeLoginChangePassword(this.userID,form.value.password)
            .subscribe(response =>{
                this.authService.logout();
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
        }else {
            this.errorMessage="Password does not match";
        }
    }
}