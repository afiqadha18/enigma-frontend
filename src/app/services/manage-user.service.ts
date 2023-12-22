import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, map } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../model/user.model";

@Injectable({providedIn: 'root'})
export class ManageUserService{
    private user: User[] =[];
    private userUpdated = new Subject<User[]>();
    constructor(private http: HttpClient, private router: Router){}

    getUser(userId:string) {
        // var userData;
        // this.http.get<{message: string, user:any[]}>('http://localhost:3001/api/user/getuser/'+ userId)
        // .pipe(map((userData) =>{
        //     return userData.user.map(user => {
        //         return {
        //             userID : user.userID,
        //             username : user.username,
        //             password : user.password,
        //             email : user.email,
        //             firstTimeLogin : user.firstTimeLogin,
        //             status : user.status,
        //             role : user.role,
        //             created_by : user.created_by,
        //             created_datetime : user.created_datetime,
        //             lastLogin : user.lastLogin
        //         }
        //     })
        // }))
        // .subscribe(userMappedData => {
        //     userData = userMappedData;
        // })
        return {...this.user.find(user => user.userID === userId)};
    }

    getAllUser(){
        this.http.get<{ message: string, user: any[]}>('http://localhost:3001/api/user/getalluser')
        .pipe(map((userData) => {
            return userData.user.map(user => {
                console.log("here user: " + user.email);
                return{
                    userID : user.userID,
                    username : user.username,
                    password : user.password,
                    email : user.email,
                    firstTimeLogin : user.firstTimeLogin,
                    status : user.status,
                    role : user.role,
                    created_by : user.created_by,
                    created_datetime : user.created_datetime,
                    lastLogin : user.lastLogin
                }
            })
        })).subscribe(userTransformData => {
            this.user = userTransformData;
            console.log("here userTransform: " + this.user[0].email);
            this.userUpdated.next([...this.user]);
        })
    }

    deleteUser(userID : string){
        this.http.delete<{message: string}>('http://localhost:3001/api/user/deleteUser/' + userID)
        .subscribe(response =>{
            const updateduser = this.user.filter( user => user.userID !== userID);
            this.user = updateduser;
            this.userUpdated.next([...this.user]);
        })
    }

    addUser(username: string, email: string, role: string){
        const user: User = {userID:'', username: username, email:email, role:role,  firstTimeLogin:true, status:true}
        this.http.post<{message: string, userID: string, firstTimeLogin: string, status: string}>('http://localhost:3001/api/user/adduser',user)
        // .pipe(map((userAdded)=>{
        //     return userAdded.user.map(userdata => {
        //         return{
        //             userID : userdata.userID,
        //             username : userdata.username,
        //             password : userdata.password,
        //             email : userdata.email,
        //             firstTimeLogin : userdata.firstTimeLogin,
        //             status : userdata.status,
        //             role : userdata.role,
        //             created_by : userdata.created_by,
        //             created_datetime : userdata.created_datetime,
        //             lastLogin : userdata.lastLogin
        //         }
        //     })
        // }))
        .subscribe(response => {
            console.log("user ID: " +response.userID);
            console.log("firstTimeLogin: " +response.firstTimeLogin);
            console.log("status: " +response.status);
            user.userID = response.userID;
            this.user.push(user);
            this.userUpdated.next([...this.user]);
            this.router.navigate(["/user"]);

        })
    }

    editUser(username: string, email: string, role: string, status: string){
        
    }

    getUserUpdateAsObservable(){
        return this.userUpdated.asObservable();
    }
}