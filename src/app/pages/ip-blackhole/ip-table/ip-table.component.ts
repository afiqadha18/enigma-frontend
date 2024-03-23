import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../../services/bgp-peering.service';
import Swal from 'sweetalert2';

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

    startExecute(ip_address: string) {
      Swal.fire({
        title: "Start Execution?",
        text: `Continue to execute blackhole process for ${ip_address}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ef8157",
        cancelButtonColor: "#51cbce",
        confirmButtonText: "Yes, continue!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Started!",
            text: "Blackhole process is running.",
            icon: "success"
          });
        }
      });
    }

    stopExecute(ip_address: string) {
      Swal.fire({
        title: "Stop Execution?",
        text: `Stop executing blackhole process ${ip_address}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef8157",
        cancelButtonColor: "#51cbce",
        confirmButtonText: "Yes, stop!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Stopped!",
            text: "Blackhole process is stopped.",
            icon: "success"
          });
        }
      });
    }

}
