import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import $ from 'jquery';
import $, { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { DemandService } from 'src/app/Services/demand.service';
import { DemandeurService } from 'src/app/Services/demandeur.service';
import { HelperService } from 'src/app/Services/helper.service';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';
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
//demandeur: Demandeur[] = [];
utilisateur: Utilisateur = {};
demandeurId!: number;
id!: number;
nin!: string;


  constructor(private demandeService: DemandService, private route: Router, private activaterouter:ActivatedRoute,
              private demandeurService: DemandeurService,private helperService: HelperService, private utilisateurService: UtilisateurService,
              private spinner:NgxSpinnerService){}


  ngOnInit(){
    const id = this.activaterouter.snapshot.params['id'];
    const demandeurId = this.activaterouter.snapshot.paramMap.get('demandeurId');
      console.log("id =" + id);
      
        console.log("id Demandeur ="+demandeurId);
        this.getDemandeur();
        //this.makeDemande();
         this.nin= localStorage.getItem("nin")!;
         console.log("nin"+this.nin);
         
        this.getDemandeurByNin();
        console.log("idD ="+this.demandeurId);
        
 }


 openSpinner(){
  this.spinner.show();
  setTimeout(()=>{
    this.spinner.hide();
  },6000)
}



onMakeDemande(){
  this.demandeService.makeDemande(Number(this.demandeurId)).subscribe({
    next:(data)=>{
      console.log("resultat"+data);
      
    }
  })

}


getDemandeur(){
  this.demandeurService.getUsers().subscribe((response:any) =>{
    this.demandeur = response;
    console.log(response);
  })
}
getDemandeurByNin(){
  this.demandeurService.getDemandeurByNin(this.nin).subscribe({
    next:(data)=>{
      this.demandeur = data;
      this.demandeurId = Number(data.id);
      console.log("idDemandeur"+this.demandeurId);
      
    }
  })
}

logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('profile');
  localStorage.removeItem('nin');
  this.route.navigate(['/formule']);
}

// updateDemandeur(data:any,id:number){
//   this.demandeurService.update(data,id).subscribe({
//     next:(data)=>{
//       console.log(data);
//       this.demandeur = data;
      
//     }
//   })

//}

}
