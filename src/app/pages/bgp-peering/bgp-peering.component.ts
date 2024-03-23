import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../services/bgp-peering.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPeerDialog } from './add-peer/add-peer.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { EditPeerDialog } from './edit-peer/edit-peer.component';
import { DeletePeerDialog } from './delete-peer/delete-peer.component';
import { Peer } from '../../model/peer.model';

@Component({
    selector: 'bgp-peering-cmp',
    moduleId: module.id,
    templateUrl: 'bgp-peering.component.html'
})

export class BgpPeeringComponent implements OnInit{
 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'peerName', 'peerIp', 'peerAsn', 'localAsn', 'nextHopIp', 'bgpCommunity', 'bgpPassword', 'dataCenter', 'status', 'lastUpdatedBy', 'lastUpdatedOn', 'action'];
  dataSource: any = new MatTableDataSource();
  peer: Peer[] = [];
  private peerSub: Subscription | undefined;

  constructor(private bgpService: BgpPeeringService, public dialog: MatDialog) { }

    ngOnInit() {
      this.bgpService.getPeerList();
      this.peerSub = this.bgpService.getPeerUpdateListener()
        .subscribe((result: any) => {
          // console.log(result);
          this.peer = result;
          this.dataSource.data = result;
        })
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    addPeer() {
      this.dialog.open(AddPeerDialog, {
        disableClose: true,
        width: "50vw",
        height: "fit-content",
      })
    }

    editPeer(index: number) {
      this.dialog.open(EditPeerDialog, {
        disableClose: true,
        width: "50vw",
        height: "fit-content",
        data: this.dataSource.data[index]
      })
    }

    deletePeer(index: number) {
      this.dialog.open(DeletePeerDialog, {
        disableClose: true,
        width: "25vw",
        height: "fit-content",
        data: this.dataSource.data[index]
      })
    }

}
