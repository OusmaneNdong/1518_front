import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { DemandeurService } from 'src/app/Services/demandeur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';

@Component({
  selector: 'app-update-demandeur',
  templateUrl: './update-demandeur.component.html',
  styleUrls: ['./update-demandeur.component.css']
})
export class UpdateDemandeurComponent implements OnInit {

demandeur : Demandeur = {}

    constructor(private demandeurService:DemandeurService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.params['id']);
    this.demandeurService.getDemandeurById(id).subscribe({
      next:(data)=>{
        this.demandeur=data;
        // console.log("getDemandeur" + this.demandeur.fonction);
      }
    })
    
      
      
      

  }



  update(data:any){
    this.demandeurService.update(data).subscribe({
      next:(data)=>{
        // this.demandeur = data;
        console.log("data demandeur " + data);
        
      }
    })
  }
  onUpdate(){
    // this.demandeur.utilisateurDTO.id = localStorage.getItem('userId');
    // console.log("this demandeur" + this.demandeur.id);
    this.demandeurService.update(this.demandeur).subscribe({

      next:(data)=>{
        // this.demandeur = data;
        console.log("data demandeur " + data);
        
      }
    })
  }


}
