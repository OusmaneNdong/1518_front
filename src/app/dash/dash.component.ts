import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../Servicess/dashbord.service';
import { Router } from '@angular/router';
import { Demandeur } from '../modeles/demandeur.modele';
import { Demande } from '../modeles/demande.modele';
import { HelperService } from '../Servicess/helper.service';
import { UtilisateurService } from '../Servicess/utilisateur.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{


 fullName: string = " ";
  data:any;
  dataApprouved: Demande[]=[];
  dataRejeted: Demande[]=[];
  dataCours: Demande[]=[];
  rejetes: Demande[]=[];
  cours: Demande[]=[];

constructor(private dashbordService:DashbordService,private routes:Router,private helper: HelperService, private utilisateurService: UtilisateurService){}

  ngOnInit(): void {
    this.fullName = this.utilisateurService.fullName;
    
    this.getFullName()
    
    this.getCount();
    
    this.getApprouved();
    this.getCours();
    this.getRejeted();

    // this.getAllCours();
    // this.getAllRejeted();
  }

  getFullName(){
    this.fullName = this.helper.fullName;
  }

   getCount(){
    this.dashbordService.getDemandeCount().subscribe((response:any)=>{
      this.data = response;
      
    })
  }
  getApprouved(){
    this.dashbordService.getDemandeApprouved().subscribe((response :any) =>{
      this.dataApprouved = response;
      
    } )
  }
  getRejeted(){
    this.dashbordService.getDemandeRejeted().subscribe((response:any)=>{
      this.dataRejeted = response;
     
    })
  }

  getCours(){
    this.dashbordService.getDemandeCours().subscribe((response:any)=>{
      this.dataCours = response;
      
      
    })
  }

  logout(){
    localStorage.clear();
    this.routes.navigate(['/connecter']);
  }



}
