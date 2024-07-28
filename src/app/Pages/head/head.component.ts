import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
  
})
export class HeadComponent implements OnInit {

  demandeur: Demandeur = {};
  
  constructor(private auth: UtilisateurService,  private router:Router, private demandeurService: DemandeurService){}

  isLogin =false;
  nin!: string;
  
  ngOnInit(): void {
    this.nin= localStorage.getItem("nin")!;
    this.isLogin = this.auth.isLoaging
    if(localStorage.getItem("token")){
       this.isLogin = true;
      
    }
      console.log("this.isLogin" + this.isLogin);
      this.getDemandeurByNin(this.nin)
    
  }

refresh(){
  window.location.reload();
}

deconnect(){
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('profile');
  localStorage.removeItem('nin');
  this.router.navigate(['/connecter']);
  this.refresh()
}

getDemandeurByNin(nin:string){
  this.demandeurService.getDemandeurByNin(nin).subscribe({
    next:(data)=>{
      this.demandeur = data;
    }
  })
}


}
