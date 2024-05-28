import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthInterceptor } from "./auth/auth-interceptor"; 
import { LoginComponent } from "./pages/login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { AuthGuard } from "./auth/auth.guard";
import { FirstTimeLoginComponent } from "./pages/login/first-time-login/first-time-login.component";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorHandlingComponent } from "./error/error-handling.component";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        FirstTimeLoginComponent,
        ErrorHandlingComponent
    ],
    providers: [{ provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},AuthGuard,
       // { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
    ],
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
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatGridListModule,
        
        FixedPluginModule
    ]
})
export class AppModule { }
