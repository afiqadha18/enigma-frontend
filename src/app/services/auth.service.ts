import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({providedIn: "root"})
export class AuthService{
    token: string | undefined;
    username: string | undefined | null;
    userId: string | undefined;
    isUserAuthenticated = false;
    authStatusListener = new Subject<boolean>();
    tokenTimer : any;
    constructor(private http:HttpClient, private router: Router){}

    login(username: string, password: string){
        const authData = { username: username, password:password};
        return this.http.post<{token : string, expiresIn: number, userId: string, username: string, firstTimeLogin: boolean}>('http://localhost:3001/api/login',authData);
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
        clearTimeout(this.tokenTimer);
        this.clearAuthenticationData();
        this.userId = "";
        this.username ="";
        this.router.navigate(['/login']);
    }

    getUserIsAuthenticated(){
        return this.isUserAuthenticated;
    }

    saveAuthenticationData(token: string, expirationDate: Date, userId: string, username: string){
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
    }

    clearAuthenticationData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
    }

    getAuthenticationData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        if(!token || !expirationDate || !userId){
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            username: username
        }
    }

    setAuthTimer(expiresInDuration: number){     
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiresInDuration*1000);        
    }

}