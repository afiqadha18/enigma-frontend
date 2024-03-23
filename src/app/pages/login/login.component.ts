import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
   // selector: 'app-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent{
    constructor(private authservice: AuthService){}

    onLogin(form: NgForm){
        if(form.invalid){
            return;
        }
        this.authservice.login(form.value.username, form.value.password);
    }
}