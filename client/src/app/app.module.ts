import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from "angular2-datatable";


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonorRegisterComponent } from './components/donor-register/donor-register.component';
import { BloodRequestComponent } from './components/blood-request/blood-request.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchDonorComponent } from './components/search-donor/search-donor.component';
import { DonorContactModalComponent } from './components/donor-contact-modal/donor-contact-modal.component';
//import { DataFilterPipe } from './filters/data-filter.pipe';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { DonorService } from './services/donor.service';
import { BloodRequestService } from './services/blood-request.service';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DropdownModule } from "ng2-dropdown";
import { ModalService} from './modal/modal.service';

import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent} from './modal/modal.component';




const appRoutes: Routes  = [
  { path: '',  component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blood-request',  component: BloodRequestComponent },
  { path: 'searchDonor',  component: SearchDonorComponent },
  { path: 'registerUser',  component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'registerDonor',  component: DonorRegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    DonorRegisterComponent,
    BloodRequestComponent,
    FooterComponent,
    SearchDonorComponent,
    DonorContactModalComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DropdownModule,
    DataTableModule,
    NgbModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    DonorService,
    BloodRequestService,
    ModalService,
    NgbModal
  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
