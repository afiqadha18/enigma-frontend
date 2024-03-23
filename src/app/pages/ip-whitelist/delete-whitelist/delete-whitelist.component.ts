import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { WhitelistService } from 'src/app/services/whitelist.service';

@Component({
  selector: 'delete-whitelist-dialog',
  templateUrl: 'delete-whitelist.component.html',
})
export class DeleteWhitelistDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<DeleteWhitelistDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private whitelistService: WhitelistService) { }

  deleteWhitelistForm!: FormGroup;

  ngOnInit() {
    // console.log(this.data);
    this.deleteWhitelistForm = this.formBuilder.group({
      listId: new FormControl({ value: this.data.listId, disabled: false }),
      ipAddress: new FormControl({ value: this.data.ipAddress, disabled: false }),
      description: new FormControl({ value: this.data.description, disabled: false }),
      addedBy: new FormControl({ value: this.data.addedBy, disabled: false }),
      addedDate: new FormControl({ value: this.data.addedDate, disabled: false }),
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    let deleteId = this.deleteWhitelistForm.value.listId;
    console.log(deleteId);
    this.whitelistService.deleteWhitelist(deleteId)
      .subscribe((res: any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: "Deleted",
          text: res.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // this.router.navigate(['/bgp-peering']);
            this.dialogRef.close();
            let updatedList = this.whitelistService.whitelist.filter(list => list.listId !== deleteId);
            this.whitelistService.whitelist = updatedList;
            this.whitelistService.whitelistUpdated.next([...updatedList]);
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
