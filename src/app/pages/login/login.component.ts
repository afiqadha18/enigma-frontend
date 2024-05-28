import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
   // selector: 'app-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.css']
})

export class LoginComponent{
    constructor(private authservice: AuthService, private router:Router ){}

    onLogin(form: NgForm){
        if(form.invalid){
            return;
        }
        this.authservice.login(form.value.username, form.value.password)
        .subscribe(response => {
            console.log("response "+ response.token);
            this.authservice.token = response.token;
            if(this.authservice.token){
                const expiresInDuration = response.expiresIn;
                console.log("expire time :" + expiresInDuration * 1000);
                this.authservice.setAuthTimer(expiresInDuration);
                this.authservice.username = response.username;
                this.authservice.userId = response.userId;
                this.authservice.authStatusListener.next(true);
                this.authservice.isUserAuthenticated = true;
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
                this.authservice.saveAuthenticationData(this.authservice.token, expirationDate,this.authservice.userId, this.authservice.username);
                //if first time user flag is up then we need to make user change password
                if(response.firstTimeLogin){
                    this.router.navigate(['/firstTimeLogin', this.authservice.userId]);
                }else{
                    this.router.navigate(['/dashboard']);       
                }
                
            }
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
}
