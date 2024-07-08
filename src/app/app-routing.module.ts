import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { DemandeurComponent } from './Pages/demandeur/demandeur.component';
import { EspaceClientComponent } from './Pages/espace-client/espace-client.component';
import { DashComponent } from './dash/dash.component';
import { TablesComponent } from './dash/tables/tables.component';
import { DashbordComponent } from './dash/dashbord/dashbord.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { FormuleComponent } from './Pages/formule/formule.component';
import { SetPasswordComponent } from './Pages/set-password/set-password.component';
import { TestComponent } from './Pages/test/test.component';
import { ListDemandesComponent } from './Pages/list-demandes/list-demandes.component';
import { DemandeDetailsComponent } from './Pages/demande-details/demande-details.component';
import { UtilisateurDetailsComponent } from './Pages/utilisateur-details/utilisateur-details.component';
import { DemandeurDetailsComponent } from './Pages/demandeur-details/demandeur-details.component';
import { EspaceComponent } from './Pages/espace/espace.component';
import { MesDemandesComponent } from './Pages/mes-demandes/mes-demandes.component';
import { CardComponent } from './Pages/card/card.component';
import { AdminDasboardComponent } from './Pages/admin-dasboard/admin-dasboard.component';
import { DemosComponent } from './Pages/demos/demos.component';
import { HeadComponent } from './Pages/head/head.component';
import { ValidationComponent } from './Pages/validation/validation.component';
import { AdminGuardGuard } from './Services/guard/admin-guard.guard';
import { TokenGuardGuard } from './Services/guard/token-guard.guard';
import { DowloadComponent } from './Pages/dowload/dowload.component';
import { ViewFileComponent } from './Pages/view-file/view-file.component';
import { NavlinkComponent } from './Pages/navlink/navlink.component';
import { ResetComponent } from './Pages/reset/reset.component';
import { UpdateDemandeurComponent } from './Pages/update-demandeur/update-demandeur.component';
import { HeadersComponent } from './Pages/headers/headers.component';
import { FootersComponent } from './Pages/footers/footers.component';
// import { DialogComponent } from './Pages/dialog/dialog.component';

const routes: Routes = [
  {path:'validation',component:ValidationComponent},
  {path:'formule',component:FormuleComponent},
  { path:'footer',component:FooterComponent },
  { path:'header', component: HeaderComponent },
  { path:'accueil',component:AccueilComponent },
  {path:'download',component:DowloadComponent},
  {path:'viewFile',component:ViewFileComponent},
  {path:'navlink', component:NavlinkComponent},
  {path:'reset', component:ResetComponent},
  {
    path: 'user',
    component: AccueilComponent,
    children:[
      { path:"demandeur",component:DemandeurComponent },
      { path:"espaceClient", component:EspaceClientComponent },
     {path:'',redirectTo:'accueil', pathMatch:'full'},
    ]

  },
  {
    path: 'admin',
    component: ListDemandesComponent,
    children:[
      {path:"list_demandes",component:ListDemandesComponent},
      {path:"verificationattestation/:id",component:DemandeurDetailsComponent}
    ]
  },
   {path:"head", component:HeadComponent},
   {path:'headers',component:HeadersComponent},
   {path:'footers',component:FootersComponent},
  {path:'setPassword/:token',component:SetPasswordComponent},
  
  // {path:'**',redirectTo:'accueil', pathMatch:'full'},
  { path:"login",component:LoginComponent },
  {path:"demande_details/:id",component:DemandeDetailsComponent},
  {path:"verificationattestation/:id",component:DemandeurDetailsComponent, canActivate: [AdminGuardGuard]},
  {path:"utilisateur_details/:id",component:UtilisateurDetailsComponent,canActivate: [AdminGuardGuard,TokenGuardGuard]},
  {path:"signup",component:SignupComponent},
  {path:'test',component:TestComponent},
  { path:"home",component:HomeComponent },
  {path:"espace",component:EspaceComponent},
  {path:'update',component:UpdateDemandeurComponent},
  { path:"password",component:ForgotPasswordComponent },
  { path:"demandeur",component:DemandeurComponent },
  {path:"mesdemandes/:id",component:MesDemandesComponent, canActivate: [TokenGuardGuard]},
 { path:"espaceClient", component:EspaceClientComponent},
 {path:"card",component:CardComponent},
 {path:"administration",component:AdminDasboardComponent},
 {path:'update-demandeur/:id',component:UpdateDemandeurComponent},
 {path:"demo", component:DemosComponent},
 {path:'',redirectTo:'accueil', pathMatch:'full'},
 { path: "dash",component:DashComponent
 , canActivate: [AdminGuardGuard]
 ,children:[
 {path:'',redirectTo:'dash/list_demandes', pathMatch:'full'},
  //{path:'', redirectTo:'list_demandes',pathMatch:'full'},
  { path:"table",component:TablesComponent},
  { path:"dashbord",component:DashbordComponent},
  {path:"list_demandes",component:ListDemandesComponent},
  {path:'',redirectTo:'accueil', pathMatch:'full'}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
