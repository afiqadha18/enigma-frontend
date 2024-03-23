import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WhitelistService } from 'src/app/services/whitelist.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'add-whitelist-dialog',
  templateUrl: 'add-whitelist.component.html',
})
export class AddWhitelistDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<AddWhitelistDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private whitelistService: WhitelistService) { }

  addWhitelistForm!: FormGroup;

  ngOnInit() {
    this.addWhitelistForm = this.formBuilder.group({
      ipAddress: new FormControl({ value: '', disabled: false}),
      description: new FormControl({ value: '', disabled: false}),
      addedBy: new FormControl({ value: 'system_test', disabled: false}),
      addedDate: new FormControl({ value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: false})
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // console.log(this.addWhitelistForm.value);
    this.whitelistService.addWhitelist(this.addWhitelistForm.value)
      .subscribe((res: any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: "Submitted",
          text: res.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // this.router.navigate(['/bgp-peering']);
            this.dialogRef.close();
            this.whitelistService.whitelist.push(this.addWhitelistForm.value);
            this.whitelistService.whitelistUpdated.next([...this.whitelistService.whitelist]);
          }
        });

      },
      (error) => {
        console.log(error);
        console.log('status code: ' + error.status);
        Swal.fire({
          title: error.statusText,
          text: error.error.error,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        })
      })
  }

}
