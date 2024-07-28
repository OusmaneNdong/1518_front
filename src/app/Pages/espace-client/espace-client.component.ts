import { getLocaleDateFormat } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashbordService } from 'src/app/Servicess/dashbord.service';
import { DemandService } from 'src/app/Servicess/demand.service';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { HelperService } from 'src/app/Servicess/helper.service';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { Demande } from 'src/app/modeles/demande.modele';
import { Demandeur } from 'src/app/modeles/demandeur.modele';
import { Utilisateur } from 'src/app/modeles/utilisateur.modele';
 

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit{

demandeur: Demandeur = {};
utilisateur: Utilisateur = {};
demandeurId!: number;
id!: number;
nin!: string;
demande: Demande  = {};
statutRejected!:string;
statutCours!:string;
demandes: Demande [] = [];
fileStatus = { status: '', requestType: '', percent: 0 };
filenames: string[] = [];
currentDate?: Date;

  constructor(private demandeService: DemandService, private route: Router, private activaterouter:ActivatedRoute,
              private demandeurService: DemandeurService,private helperService: HelperService, private utilisateurService: UtilisateurService,
              private spinner:NgxSpinnerService, private dashbordService: DashbordService){}


    ngOnInit(){
       this.nin= localStorage.getItem("nin")!;
         console.log("nin"+this.nin);
        this.getDemandeurByNin(this.nin);    
        const id = this.activaterouter.snapshot.params['id'];
        this.getMesDemandes(id);
        console.log("id demandeur "+this.activaterouter.snapshot.params['id']);
        this.changePassword(data);
        this.getDemandeByIdDemandeur(id);
    }

    getMesDemandes(id:number){
      this.demandeService.getDemanderById(id).subscribe({
        next:(data)=>{
          this.demande = data;
          console.log("data de mes demande" + " " + data.demandeurDTO.telephone);
        }
      })
    }


 openSpinner(){
  this.spinner.show();
  setTimeout(()=>{
    this.spinner.hide();
  },1000)
}

onMakeDemande(){
  this.demandeService.makeDemande(Number(this.demandeurId)).subscribe({
    next:(data)=>{
      console.log("resultat" + " " + data);
    }
  })
}
 
getDemandeByIdDemandeur(id: number){
  this.demandeService.getDemandeByIdDemandeur(id).subscribe({
    next:(data)=>{
      this.demandes = data;
    }
  })
}

changePassword(data:any){
  this.utilisateurService.changePassword(data).subscribe({
    next:(value)=> {
      this.route.navigate(['/connecter']);
    },
  })
}

getDemandeurByNin(nin:string){
  this.demandeurService.getDemandeurByNin(nin).subscribe({
    next:(data)=>{
      this.demandeur = data;
      this.demandeurId = Number(data.id);
      console.log("idDemandeur" + " " + this.demandeurId);
    }
  })
}



load(urlattestation: string | undefined){
  this.demandeService.downloadDemande(urlattestation as string).subscribe(
    event=>{
        console.log(event);
        this.resportProgress(event);
    }
  )
}
private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
  switch(httpEvent.type) {
    case HttpEventType.UploadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
      break;
    case HttpEventType.DownloadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
      break;
    case HttpEventType.ResponseHeader:
      console.log('Header returned', httpEvent);
      break;
    case HttpEventType.Response:
      if (httpEvent.body instanceof Array) {
        this.fileStatus.status = 'done';
        for (const filename of httpEvent.body) {
          this.filenames.unshift(filename);
        }
      } else {
        saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
      }
      this.fileStatus.status = 'done';
      break;
      default:
        console.log(httpEvent);
        break;
    
  }
}

private updateStatus(loaded: number, total: number, requestType: string): void {
  this.fileStatus.status = 'progress';
  this.fileStatus.requestType = requestType;
  this.fileStatus.percent = Math.round(100 * loaded / total);
}



}
