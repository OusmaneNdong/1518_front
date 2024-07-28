import { Component, Input } from '@angular/core';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';

@Component({
  selector: 'app-list-demandeur',
  templateUrl: './list-demandeur.component.html',
  styleUrls: ['./list-demandeur.component.css']
})
export class ListDemandeurComponent {
 
  demandeurs: Array<Demandeur> = [];
  itemsPerPage = 1;
  currentPage = 1;
  totalItems = 0;

  constructor(private demandeurService: DemandeurService) { }

  ngOnInit(): void {
    this.getAll();    
  }

  getAll(){
    this.demandeurService.getAllDemandeur().subscribe({
      next:(data)=>{
        this.demandeurs = data;
        this.totalItems= this.demandeurs.length;
        
      }
    })
  }

  get paginateData(){
    const star = (this.currentPage-1) * this.itemsPerPage;
    const end = star + this.itemsPerPage;
    return this.demandeurs.slice(star, end);

    
  }

  changePage(page: number){
    this.currentPage = page;
  } 
}
