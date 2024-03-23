import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'add-peer-dialog',
  templateUrl: 'add-peer.component.html',
})
export class AddPeerDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<AddPeerDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private bgpService: BgpPeeringService, private authService: AuthService) { }

  addPeerForm!: FormGroup;
  tempForm!: FormGroup;

  ngOnInit() {
    this.addPeerForm = this.formBuilder.group({
      peerName: [''],
      peerAddress: [''],
      peerAsn: [''],
      localAsn: [''],
      nextHopIp: [''],
      bgpCommunity: [''],
      bgpPassword: [''],
      dataCenter: [''],
      status: ['active']
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.addPeerForm.value);
    this.bgpService.addPeer(this.addPeerForm.value)
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
              peerName: new FormControl({ value: this.addPeerForm.value.peerName, disabled: false }),
              peerAddress: new FormControl({ value: this.addPeerForm.value.peerAddress, disabled: false }),
              peerAsn: new FormControl({ value: this.addPeerForm.value.peerAsn, disabled: false }),
              localAsn: new FormControl({ value: this.addPeerForm.value.localAsn, disabled: false }),
              nextHopIp: new FormControl({ value: this.addPeerForm.value.nextHopIp, disabled: false }),
              bgpCommunity: new FormControl({ value: this.addPeerForm.value.bgpCommunity, disabled: false }),
              bgpPassword: new FormControl({ value: this.addPeerForm.value.bgpPassword, disabled: false }),
              dataCenter: new FormControl({ value: this.addPeerForm.value.dataCenter, disabled: false }),
              status: new FormControl({ value: this.addPeerForm.value.status, disabled: false }),
              lastUpdatedBy: new FormControl({ value: this.authService.getUsername(), disabled: false}),
              lastUpdatedOn: new FormControl({ value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: false })
            })
            this.bgpService.peerList.push(this.tempForm.value);
            this.bgpService.peerUpdated.next([...this.bgpService.peerList]);
            // reload require to avoid error when user edit data after add the data (no peerId if not reload)
            window.location.reload();
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
