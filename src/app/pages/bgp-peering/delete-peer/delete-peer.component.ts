import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'delete-peer-dialog',
  templateUrl: 'delete-peer.component.html',
})
export class DeletePeerDialog implements OnInit{
  constructor(public dialogRef: MatDialogRef<DeletePeerDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private bgpService: BgpPeeringService) { }

  deletePeerForm!: FormGroup;

  ngOnInit() {
    // console.log(this.data);
    this.deletePeerForm = this.formBuilder.group({
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

  onDelete() {
    let deleteId = this.deletePeerForm.value.peerId;
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
