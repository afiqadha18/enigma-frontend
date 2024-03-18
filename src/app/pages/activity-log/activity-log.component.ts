import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master.service';

@Component({
    selector: 'activity-log-cmp',
    moduleId: module.id,
    templateUrl: 'activity-log.component.html'
})

export class ActivityLogComponent implements OnInit{
 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'ip_address', 'duration', 'status', 'uploadedBy', 'uploadedOn', 'remarks'];
  dataSource: any = new MatTableDataSource();

  constructor(private masterService: MasterService) { }

    ngOnInit() {
      this.masterService.getActivityLogs()
        .subscribe((result: any) => {
          console.log(result);
          this.dataSource.data = result.data;
        })
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

}
