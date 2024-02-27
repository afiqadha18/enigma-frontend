import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxFilesizeModule } from 'ngx-filesize';

import { AdminLayoutRoutes, AppRoutingModule }        from './admin-layout.routing';
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { IpTableComponent }         from '../../pages/bgp-peering/ip-table/ip-table.component';
import { IpUploadComponent }        from '../../pages/bgp-peering/ip-upload/ip-upload.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BgpPeeringComponent } from 'src/app/pages/bgp-peering/bgp-peering.component';
import { ExcelUploadComponent } from 'src/app/pages/bgp-peering/excel-upload/excel-upload.component';
import { UserTableComponent } from 'src/app/pages/manage-user/user-listing/user-table.component';
import { AddUserComponent } from 'src/app/pages/manage-user/add-user/add-user.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { EditUserComponent } from 'src/app/pages/manage-user/edit-user/edit-user.component';
import { FirstTimeLoginComponent } from 'src/app/pages/login/first-time-login/first-time-login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    NgxFileDropModule,
    NgxFilesizeModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule,
    MatInputModule,
    MatGridListModule
    
    
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    IconsComponent,
    IpTableComponent,
    IpUploadComponent,
    BgpPeeringComponent,
    ExcelUploadComponent,
    UserTableComponent,
    AddUserComponent,
    EditUserComponent,
    FirstTimeLoginComponent
  ],
  providers: [],
})

export class AdminLayoutModule {}
