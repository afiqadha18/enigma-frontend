import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ManageUserService } from "src/app/services/manage-user.service";

@Component({
    templateUrl: './first-time-login.component.html'
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
            this.authService.firstTimeLoginChangePassword(this.userID,form.value.password);
        }else {
            this.errorMessage="Password does not match";
        }
    }
}