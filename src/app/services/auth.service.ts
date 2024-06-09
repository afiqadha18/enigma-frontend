import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { role } from "../model/role.model";
@Injectable({providedIn: "root"})
export class AuthService{
    token: string | undefined;
    username: string | undefined | null;
    role: string | undefined;
    userId: string | undefined;
    isUserAuthenticated = false;
    isUserLoggedIn = new Subject<boolean>();
    authStatusListener = new Subject<boolean>();
    tokenTimer : any;
    isAdmin: | undefined;
    hasAnyRole: String | undefined;
    constructor(private http:HttpClient, private router: Router){}

    login(username: string, password: string){
        const authData = { username: username, password:password};
        return this.http.post<{token : string, expiresIn: number, userId: string, username: string, firstTimeLogin: boolean, role: string}>('http://localhost:3001/api/login',authData);
    }

    firstTimeLoginChangePassword(userID: string, password: string){
        const authData = { userID: userID, password:password};
        return this.http.post<{message: string}>('http://localhost:3001/api/user/changePasswordFirstLogin',authData);
        
    }

    autoAuthenticatedUser(){
        const authInformation = this.getAuthenticationData();
        const now = new Date();
        if(!authInformation){ 
            return;
        }
            const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
            if(expiresIn > 0){
                this.token = authInformation.token;
                this.setAuthTimer(expiresIn/1000);
                this.authStatusListener.next(true);
                this.isUserAuthenticated = true;
                this.isUserLoggedIn.next(true);
                this.userId = authInformation.userId;
                this.username = authInformation.username;
            }
    }

    getUserId(){
        return this.userId;
    }

    getUsername(){
        return this.username;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getToken(){
        return this.token;
    }

    logout(){
        this.token = "";
        this.authStatusListener.next(false);
        this.isUserAuthenticated = false;
        this.isUserLoggedIn.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthenticationData();
        this.userId = "";
        this.username ="";
        this.router.navigate(['/login']);
    }

    getUserLoggedIn(){
        return this.isUserLoggedIn.asObservable();
    }

    checkIsUserAdmin(){
        const role = localStorage.getItem("role");
        if(role === "Admin"){
            return true;
        }
        return false;
    }

    checkUserRole(permittedRole: string[]){
        const role = localStorage.getItem("role");
        console.log("roles:"+ role);
        if(permittedRole.length>0){
            for(var o=0; o < permittedRole.length; o++){
                if(role === permittedRole[o]){
                    return true;
                }
            }
        }
        return false;
    }
    getUserIsAuthenticated(){
        return this.isUserAuthenticated;
    }

    saveAuthenticationData(token: string, expirationDate: Date, userId: string, username: string, role: string){
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("role",role);
    }

    clearAuthenticationData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    }

    getAuthenticationData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if(!token || !expirationDate || !userId){
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            username: username,
            role: role
        }
    }

    setAuthTimer(expiresInDuration: number){     
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiresInDuration*1000);        
    }

}