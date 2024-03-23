import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({providedIn: "root"})
export class AuthService{
    private token: string | undefined;
    private username: string | undefined | null;
    private userId: string | undefined;
    private isUserAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer : any;
    constructor(private http:HttpClient, private router: Router){}

    login(username: string, password: string){
        const authData = { username: username, password:password};
        return this.http.post<{token : string, expiresIn: number, userId: string, username: string, firstTimeLogin: boolean}>('http://localhost:3001/api/login',authData)
        .subscribe(response => {
            console.log("response "+ response.token);
            this.token = response.token;
            if(this.token){
                const expiresInDuration = response.expiresIn;
                console.log("expire time :" + expiresInDuration * 1000);
                this.setAuthTimer(expiresInDuration);
                this.username = response.username;
                this.userId = response.userId;
                this.authStatusListener.next(true);
                this.isUserAuthenticated = true;
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
                this.saveAuthenticationData(this.token, expirationDate,this.userId, this.username);
                //if first time user flag is up then we need to make user change password
                if(response.firstTimeLogin){
                    this.router.navigate(['/firstTimeLogin', this.userId]);
                }else{
                    this.router.navigate(['/dashboard']);       
                }
                
            }
        }, error => {
            console.log(error.message)
            return error;
        })
    }

    firstTimeLoginChangePassword(userID: string, password: string){
        const authData = { userID: userID, password:password};
        this.http.post<{message: string}>('http://localhost:3001/api/user/changePasswordFirstLogin',authData)
        .subscribe(response =>{
            this.logout();
        })
        
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

    private saveAuthenticationData(token: string, expirationDate: Date, userId: string, username: string){
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
    }

    private clearAuthenticationData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
    }

    private getAuthenticationData(){
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

    private setAuthTimer(expiresInDuration: number){     
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiresInDuration*1000);        
    }

}