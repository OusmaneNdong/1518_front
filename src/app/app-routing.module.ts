import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Pages/signup/signup.component';
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
import { ListDemandesComponent } from './Pages/list-demandes/list-demandes.component';
import { DemandeDetailsComponent } from './Pages/demande-details/demande-details.component';
import { DemandeurDetailsComponent } from './Pages/demandeur-details/demandeur-details.component';
import { MesDemandesComponent } from './Pages/mes-demandes/mes-demandes.component';
import { CardComponent } from './Pages/card/card.component';
import { AdminDasboardComponent } from './Pages/admin-dasboard/admin-dasboard.component';
import { HeadComponent } from './Pages/head/head.component';
import { AdminGuardGuard } from './Servicess/guard/admin-guard.guard';
import { TokenGuardGuard } from './Servicess/guard/token-guard.guard';
import { DowloadComponent } from './Pages/dowload/dowload.component';
import { ResetComponent } from './Pages/reset/reset.component';
import { UpdateDemandeurComponent } from './Pages/update-demandeur/update-demandeur.component';
import { FootersComponent } from './Pages/footers/footers.component';
import { AllFileComponent } from './Pages/all-file/all-file.component';
import { UploadFileComponent } from './Pages/upload-file/upload-file.component';
import { UploadComponent } from './Pages/upload/upload.component';

const routes: Routes = [
  {path:'uploads', component: UploadComponent,canActivate: [TokenGuardGuard]},
  { path: "file", component: UploadFileComponent },
  {path:'connecter',component:FormuleComponent},
  { path:'footer',component:FooterComponent },
  { path:'verifierscan/:id', component: HeaderComponent },
  { path:'accueil',component:AccueilComponent },
  {path:'download',component:DowloadComponent, canActivate: [TokenGuardGuard]},
  {path:'reset', component:ResetComponent},
  {path:'all-file',component:AllFileComponent},
   {path:"head", component:HeadComponent},
   {path:'footers',component:FootersComponent},
  {path:'setPassword/:token',component:SetPasswordComponent},
  {path:"demande_details/:id",component:DemandeDetailsComponent},
  {path:"verificationattestation/:id",component:DemandeurDetailsComponent, canActivate: [TokenGuardGuard,AdminGuardGuard]},
  {path:"inscrire",component:SignupComponent},
  {path:'update',component:UpdateDemandeurComponent, canActivate: [TokenGuardGuard]},
  { path:"password",component:ForgotPasswordComponent },
  { path:"demandeur",component:DemandeurComponent, canActivate: [TokenGuardGuard] },
  {path:"mesdemandes/:id",component:MesDemandesComponent, canActivate: [TokenGuardGuard]},
 { path:"espaceClient/:id", component:EspaceClientComponent, canActivate: [TokenGuardGuard]},
 {path:"card",component:CardComponent},
 {path:"administration",component:AdminDasboardComponent, canActivate: [TokenGuardGuard]},
 {path:'update-demandeur/:id',component:UpdateDemandeurComponent, canActivate: [TokenGuardGuard]},
 {path:'',redirectTo:'connecter', pathMatch:'full'},


 { path: "dash",component:DashComponent, canActivate: [AdminGuardGuard]
 ,children:[
 {path:'',redirectTo:'dash/list_demandes', pathMatch:'full'},
  { path:"table",component:TablesComponent, canActivate: [AdminGuardGuard]},
  { path:"dashbord",component:DashbordComponent, canActivate: [AdminGuardGuard]},
  {path:"list_demandes",component:ListDemandesComponent, canActivate: [AdminGuardGuard]},
  {path:'',redirectTo:'connecter', pathMatch:'full'}
]},
{path:"", redirectTo: "connecter", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
