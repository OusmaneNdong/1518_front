import { Component, OnInit } from '@angular/core';
import { InfoStatistique } from '../card/card.component';
import { DemandService } from 'src/app/Services/demand.service';
import { DashbordService } from 'src/app/Services/dashbord.service';
import { Demande } from 'src/app/modeles/demande.modele';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {

statisques: Array<InfoStatistique> = [];
private ntDemande = 0;
private neDemande = 0;
aDemande : Demande[]=[];
private naDemande = 0;
private nrDemande = 0;
tDemande: Demande[]=[];
rejetDemande: Demande[]=[];
coursDemande: Demande[]=[];
approuveDemande: Demande[]=[];
statutDemande: Demande[]=[];
demandes: Demande[]=[];
titre: string = "La liste des demandes";
constructor(private dashbordService:DashbordService, private demandeService: DemandService){}

ngOnInit(): void {
  this.initialize();
  this.getAll();
  }

getAll(){
  this.demandeService.getAllDemandes().subscribe((response: any)=>{
    this.demandes = response;
  })
}


private async initialize(){

  this.dashbordService.getApprouved().subscribe((response :any) =>{
    this.aDemande = response;
    this.naDemande = this.aDemande.length;
    console.log(this.aDemande.length);
    
  })

  this.naDemande = await lastValueFrom(
    this.dashbordService.getApprouved()
  );

  this.neDemande = await lastValueFrom(
    this.dashbordService.getCours()
  )

  this.ntDemande = await lastValueFrom(
    this.dashbordService.getCount()
    )

    this.nrDemande = await lastValueFrom(
      this.dashbordService.getRejeted()
    )

  this.statisques = [
    {
     title: "Toutes les demandes",
     nombre: this.ntDemande,
     infoStyle: "bg-info",
     slug: "all"
 
    },
    {
      title: "Demandes en cours",
      nombre: this.neDemande,
      infoStyle: "bg-warning",
      slug: "Cours"
   
     },
     {
      title: "Demandes approuvees",
      nombre: this.naDemande,
      infoStyle: "bg-success",
      slug: "Approuvée"
   
     },
     {
      title: "Demandes rejetees",
      nombre: this.nrDemande,
      infoStyle: "bg-danger",
      slug: "Rejetée"
   
     }
  ]
}
onStatut(val: string) {
  if(val==="all"){
    this.titre = "La liste des demandes";
    this.demandeService.getAllDemandes().subscribe((response:any)=>{
      this.demandes = response;
    })
  }else{
    this.titre = "La liste des demandes "+val;
    this.dashbordService.getByStatut(val).subscribe((response:any)=>{
      this.demandes = response;
    })
    console.log(val);
  }
  
  
}

}
