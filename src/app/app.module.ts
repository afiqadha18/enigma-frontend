import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        SidebarModule,
        NavbarModule,
        ToastrModule.forRoot(),
        FooterModule,
        FixedPluginModule,
    ]
})
export class AppModule { }
