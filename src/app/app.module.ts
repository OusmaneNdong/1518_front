import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandeurComponent } from './Pages/demandeur/demandeur.component';
import { EspaceClientComponent } from './Pages/espace-client/espace-client.component';
import { RouterModule } from '@angular/router';
import { DashbordComponent } from './dash/dashbord/dashbord.component';
import { TablesComponent } from './dash/tables/tables.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { FormuleComponent } from './Pages/formule/formule.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SetPasswordComponent } from './Pages/set-password/set-password.component';
import { ListDemandesComponent } from './Pages/list-demandes/list-demandes.component';
import { DashComponent } from './dash/dash.component';
import { DemandeurDetailsComponent } from './Pages/demandeur-details/demandeur-details.component';
import { DemandeDetailsComponent } from './Pages/demande-details/demande-details.component';
import { MesDemandesComponent } from './Pages/mes-demandes/mes-demandes.component';
import { CardComponent } from './Pages/card/card.component';
import { AdminDasboardComponent } from './Pages/admin-dasboard/admin-dasboard.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { HeadComponent } from './Pages/head/head.component';
import { TokenService } from './Servicess/token/token.service';
import { DowloadComponent } from './Pages/dowload/dowload.component';
import { ResetComponent } from './Pages/reset/reset.component';
import { UpdateDemandeurComponent } from './Pages/update-demandeur/update-demandeur.component';
import { FootersComponent } from './Pages/footers/footers.component';
import { ListDemandeurComponent } from './Pages/list-demandeur/list-demandeur.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllFileComponent } from './Pages/all-file/all-file.component';
import { UploadFileComponent } from './Pages/upload-file/upload-file.component';
import { UploadComponent } from './Pages/upload/upload.component';




@NgModule({
  declarations: [
    DashComponent,
    AppComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DemandeurComponent,
    EspaceClientComponent,
    DashbordComponent,
    TablesComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    FormuleComponent,
    SetPasswordComponent,
    ListDemandesComponent,
    DemandeurDetailsComponent,
    DemandeDetailsComponent,
    MesDemandesComponent,
    CardComponent,
    AdminDasboardComponent,
    AdminDashComponent,
    HeadComponent,
    DowloadComponent,
    ResetComponent,
    UpdateDemandeurComponent,
    FootersComponent,
    ListDemandeurComponent,
    AllFileComponent,
    UploadFileComponent,
    UploadComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
     NgxSpinnerModule,
     NgxPaginationModule,
    
     
    
    
  ],
  providers: [
   HttpClient,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
