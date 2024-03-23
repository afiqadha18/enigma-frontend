import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { WhitelistService } from '../../services/whitelist.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddWhitelistDialog } from './add-whitelist/add-whitelist.component';
// import { AddPeerDialog } from './add-peer/add-peer.component';
// import { EditPeerDialog } from './edit-peer/edit-peer.component';
// import { DeletePeerDialog } from './delete-peer/delete-peer.component';

export interface Whitelist {
  listId: number;
  ipAddress: string,
  description: string,
  addedBy: string,
  addedDate: string
}

@Component({
    selector: 'ip-whitelist-cmp',
    moduleId: module.id,
    templateUrl: 'ip-whitelist.component.html'
})

export class IpWhitelistComponent implements OnInit{
 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'ipAddress', 'description', 'addedBy', 'addedDate', 'action'];
  dataSource: any = new MatTableDataSource();
  whitelist: Whitelist[] = [];
  private whitelistSub: Subscription | undefined;

  constructor(private whitelistService: WhitelistService, public dialog: MatDialog) { }

    ngOnInit() {
      this.whitelistService.getWhitelistedIP();
      this.whitelistSub = this.whitelistService.getPeerUpdateListener()
        .subscribe((result: any) => {
          console.log(result);
          this.whitelist = result;
          this.dataSource.data = result;
        })
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    addWhitelist() {
      this.dialog.open(AddWhitelistDialog, {
        disableClose: true,
        width: "50vw",
        height: "fit-content",
      })
    }

    // editPeer(index: number) {
    //   this.dialog.open(EditPeerDialog, {
    //     disableClose: true,
    //     width: "50vw",
    //     height: "fit-content",
    //     data: this.dataSource.data[index]
    //   })
    // }

    // deletePeer(index: number) {
    //   this.dialog.open(DeletePeerDialog, {
    //     disableClose: true,
    //     width: "25vw",
    //     height: "fit-content",
    //     data: this.dataSource.data[index]
    //   })
    // }

}
