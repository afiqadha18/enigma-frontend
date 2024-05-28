import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorHandlingComponent } from "./error/error-handling.component";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor( private dialog:MatDialog){}
    intercept(req: HttpRequest<any>, next:HttpHandler){
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) =>{
                console.log("test: "+error.status);
                if(error.status === 401){
                    const dialogref = this.dialog.open(ErrorHandlingComponent, {
                        data:{
                            errorMessage: error.error.message
                        }
                    });
                    dialogref.afterClosed().subscribe(result => {
                    console.log('dialog closed');
                    })
                    return throwError(error);
                }

                return  throwError(() => new Error("error"));
                
            })
        );
    }

}