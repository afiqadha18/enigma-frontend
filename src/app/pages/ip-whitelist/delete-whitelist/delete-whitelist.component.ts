import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'delete-whitelist-dialog',
  templateUrl: 'delete-whitelist.component.html',
})
export class DeleteWhitelistDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<DeleteWhitelistDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private bgpService: BgpPeeringService) { }

  deleteWhitelistForm!: FormGroup;

  ngOnInit() {
    console.log(this.data);
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
    let deleteId = this.deleteWhitelistForm.value.peerId;
    console.log(deleteId);
    this.bgpService.deletePeer(deleteId)
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
            let updatedPeer = this.bgpService.peerList.filter(peers => peers.peerId !== deleteId);
            this.bgpService.peerList = updatedPeer;
            this.bgpService.peerUpdated.next([...updatedPeer]);
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
