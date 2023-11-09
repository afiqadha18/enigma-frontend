import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../../services/bgp-peering.service';

@Component({
    selector: 'ip-table-cmp',
    moduleId: module.id,
    templateUrl: 'ip-table.component.html'
})

export class IpTableComponent implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'ip_address', 'duration', 'status', 'uploadedBy', 'uploadedOn', 'remarks', 'action'];
  dataSource: any = new MatTableDataSource();

  constructor(private bgpService: BgpPeeringService) { }

    ngOnInit() {
      this.bgpService.getUploadedIp()
        .subscribe((result: any) => {
          console.log(result);
          this.dataSource.data = result.data;
        })
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

}
