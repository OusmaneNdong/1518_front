import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Pages/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule }from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandeurComponent } from './Pages/demandeur/demandeur.component';
import { EspaceClientComponent } from './Pages/espace-client/espace-client.component';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { DashbordComponent } from './dash/dashbord/dashbord.component';
import { TablesComponent } from './dash/tables/tables.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { HeaderComponent } from './Pages/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './Pages/footer/footer.component';
import { FormuleComponent } from './Pages/formule/formule.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SetPasswordComponent } from './Pages/set-password/set-password.component';
import { TestComponent } from './Pages/test/test.component';
import { ListDemandesComponent } from './Pages/list-demandes/list-demandes.component';
import { DashComponent } from './dash/dash.component';
import { DemandeurDetailsComponent } from './Pages/demandeur-details/demandeur-details.component';
import { DemandeDetailsComponent } from './Pages/demande-details/demande-details.component';
import { UtilisateurDetailsComponent } from './Pages/utilisateur-details/utilisateur-details.component';
import { EspaceComponent } from './Pages/espace/espace.component';
import { MesDemandesComponent } from './Pages/mes-demandes/mes-demandes.component';
import { CardComponent } from './Pages/card/card.component';
import { AdminDasboardComponent } from './Pages/admin-dasboard/admin-dasboard.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { DemosComponent } from './Pages/demos/demos.component';
import { HeadComponent } from './Pages/head/head.component';
import { ValidationComponent } from './Pages/validation/validation.component';
import { TokenService } from './Services/token/token.service';
import { TokenInterceptor } from './Services/token/token.interceptor';
import { DowloadComponent } from './Pages/dowload/dowload.component';
import { ViewFileComponent } from './Pages/view-file/view-file.component';
import { NavlinkComponent } from './Pages/navlink/navlink.component';
import { ResetComponent } from './Pages/reset/reset.component';
import { UpdateDemandeurComponent } from './Pages/update-demandeur/update-demandeur.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { MbscModule } from '@mobiscroll/angular';




@NgModule({
  declarations: [
    DashComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
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
    TestComponent,
    ListDemandesComponent,
    DemandeurDetailsComponent,
    DemandeDetailsComponent,
    UtilisateurDetailsComponent,
    EspaceComponent,
    MesDemandesComponent,
    CardComponent,
    AdminDasboardComponent,
    AdminDashComponent,
    DemosComponent,
    HeadComponent,
    ValidationComponent,
    DowloadComponent,
    ViewFileComponent,
    NavlinkComponent,
    ResetComponent,
    UpdateDemandeurComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
     NgxSpinnerModule,
     NgxPaginationModule
    //  MbscModule,
    
    
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
