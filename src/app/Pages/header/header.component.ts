import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { DemandService } from 'src/app/Servicess/demand.service';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { Demande } from 'src/app/modeles/demande.modele';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  demande: Demande  = {};

  constructor(private auth: UtilisateurService,private demandeService: DemandService,  private router:Router, private route: ActivatedRoute){}

  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.getDemande(id);

  }

  getDemande(id:number){
    this.demandeService.getDemanderById(id).subscribe({
       next:(data)=>{
         this.demande = data;
         
       }
     })
   }



}

