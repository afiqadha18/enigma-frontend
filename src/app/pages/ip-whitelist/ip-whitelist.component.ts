import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { WhitelistService } from '../../services/whitelist.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddWhitelistDialog } from './add-whitelist/add-whitelist.component';
import { DeleteWhitelistDialog } from './delete-whitelist/delete-whitelist.component';
import { Whitelist } from 'src/app/model/whitelist.model';

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
      this.whitelistSub = this.whitelistService.getWhitelistUpdateListener()
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

    deleteWhitelist(index: number) {
      this.dialog.open(DeleteWhitelistDialog, {
        disableClose: true,
        width: "25vw",
        height: "fit-content",
        data: this.dataSource.data[index]
      })
    }

}
