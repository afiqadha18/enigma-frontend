import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-peer-dialog',
  templateUrl: 'add-peer.component.html',
})
export class AddPeerDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<AddPeerDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private bgpService: BgpPeeringService) { }

  addPeerForm!: FormGroup;

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
            this.bgpService.peerList.push(this.addPeerForm.value);
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
