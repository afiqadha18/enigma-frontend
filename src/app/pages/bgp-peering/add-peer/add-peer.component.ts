import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';

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
      peerIp: [''],
      peerAsn: [''],
      localAsn: [''],
      nextHopIp: [''],
      bgpCommunity: [''],
      bgpPassword: [''],
      dataCenter: ['']
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
      })
  }

}
