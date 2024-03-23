import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ErrorInterceptor } from "../error-interceptor";

@Component({
    templateUrl:'./error-handling.component.html',
    styleUrls:['./error-handling.component.css']
})

export class ErrorHandlingComponent implements OnInit{
    errorMessage="";
    constructor(public dialogref: MatDialogRef<ErrorInterceptor>,@Inject(MAT_DIALOG_DATA) private data: {errorMessage : string}){}
    ngOnInit(): void {
        this.errorMessage= this.data.errorMessage;
    }


}