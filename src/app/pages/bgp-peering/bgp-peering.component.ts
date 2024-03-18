import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../services/bgp-peering.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPeerDialog } from './add-peer/add-peer.component';

@Component({
    selector: 'bgp-peering-cmp',
    moduleId: module.id,
    templateUrl: 'bgp-peering.component.html'
})

export class BgpPeeringComponent implements OnInit{
 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'peerName', 'peerIp', 'peerAsn', 'localAsn', 'nextHopIp', 'bgpCommunity', 'bgpPassword', 'dataCenter', 'status', 'action'];
  dataSource: any = new MatTableDataSource();

  constructor(private bgpService: BgpPeeringService, public dialog: MatDialog) { }

    ngOnInit() {
      this.bgpService.getPeerList()
        .subscribe((result: any) => {
          console.log(result);
          this.dataSource.data = result.data;
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

}
