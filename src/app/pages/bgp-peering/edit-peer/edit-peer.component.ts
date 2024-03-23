import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'edit-peer-dialog',
  templateUrl: 'edit-peer.component.html',
})
export class EditPeerDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<EditPeerDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private bgpService: BgpPeeringService, private authService: AuthService) { }

  editPeerForm!: FormGroup;
  tempForm!: FormGroup;
  hide = true;

  ngOnInit() {
    // console.log(this.data);
    this.editPeerForm = this.formBuilder.group({
      peerId: new FormControl({ value: this.data.peerId, disabled: false }),
      peerName: new FormControl({ value: this.data.peerName, disabled: false }),
      peerAddress: new FormControl({ value: this.data.peerAddress, disabled: false }),
      peerAsn: new FormControl({ value: this.data.peerAsn, disabled: false }),
      localAsn: new FormControl({ value: this.data.localAsn, disabled: false }),
      nextHopIp: new FormControl({ value: this.data.nextHopIp, disabled: false }),
      bgpCommunity: new FormControl({ value: this.data.bgpCommunity, disabled: false }),
      bgpPassword: new FormControl({ value: this.data.bgpPassword, disabled: false }),
      dataCenter: new FormControl({ value: this.data.dataCenter, disabled: false }),
      status: new FormControl({ value: this.data.status, disabled: false })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.editPeerForm.value);
    this.bgpService.editPeer(this.editPeerForm.value)
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
            this.tempForm = this.formBuilder.group({
              peerId: new FormControl({ value: this.data.peerId, disabled: false }),
              peerName: new FormControl({ value: this.editPeerForm.value.peerName, disabled: false }),
              peerAddress: new FormControl({ value: this.editPeerForm.value.peerAddress, disabled: false }),
              peerAsn: new FormControl({ value: this.editPeerForm.value.peerAsn, disabled: false }),
              localAsn: new FormControl({ value: this.editPeerForm.value.localAsn, disabled: false }),
              nextHopIp: new FormControl({ value: this.editPeerForm.value.nextHopIp, disabled: false }),
              bgpCommunity: new FormControl({ value: this.editPeerForm.value.bgpCommunity, disabled: false }),
              bgpPassword: new FormControl({ value: this.editPeerForm.value.bgpPassword, disabled: false }),
              dataCenter: new FormControl({ value: this.editPeerForm.value.dataCenter, disabled: false }),
              status: new FormControl({ value: this.data.status, disabled: false }),
              lastUpdatedBy: new FormControl({ value: this.authService.getUsername(), disabled: false}),
              lastUpdatedOn: new FormControl({ value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: false })
            })
            let updatedPeerIndex = this.bgpService.peerList.findIndex(a => a.peerId == this.editPeerForm.value.peerId);
            this.bgpService.peerList.splice(updatedPeerIndex, 1, this.tempForm.value);
            this.bgpService.peerUpdated.next([...this.bgpService.peerList]);
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
