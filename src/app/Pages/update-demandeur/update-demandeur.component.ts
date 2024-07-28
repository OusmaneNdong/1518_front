import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-demandeur',
  templateUrl: './update-demandeur.component.html',
  styleUrls: ['./update-demandeur.component.css']
})
export class UpdateDemandeurComponent implements OnInit {

demandeur : Demandeur = {}

    constructor(private demandeurService:DemandeurService, private route: ActivatedRoute, private router: Router,private spinner: NgxSpinnerService,){}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.params['id']);
    this.demandeurService.getDemandeurById(id).subscribe({
      next:(data)=>{
        this.demandeur=data;
      }
    })
  }


  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1000)
  }


  update(data:any){
    this.demandeurService.update(data).subscribe({
      next:(data)=>{
        console.log("data demandeur " + data);
      }
    })
  }
  onUpdate(){
    this.demandeurService.update(this.demandeur).subscribe({
      next:(data)=>{
        console.log("data demandeur " + data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "la modifaction de vos informations a été éffectué avec success",
          showConfirmButton: true,
          timer: 2000
        }).then(()=>{
          this.router.navigate(['/formule']);
          // this.router.navigate(['/espaceClient',data])
        })
        
      }
    })
  }


}
