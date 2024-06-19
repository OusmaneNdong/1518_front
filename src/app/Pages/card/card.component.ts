import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashbordService } from 'src/app/Services/dashbord.service';
import { Demande } from 'src/app/modeles/demande.modele';
export interface InfoStatistique{
  title?: string;
  nombre?: number;
  slug?: string;
  infoStyle?: 'bg-primary' | 'bg-success' | 'bg-warning' | 'bg-danger' | "bg-info";
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() infoStatistique: InfoStatistique = {} 

@Input() tDemande: Demande[] = [];
@Output() stringChange: EventEmitter<string> = new EventEmitter();

constructor(private dashbordService: DashbordService){

}
  ngOnInit(): void {
  }

  test(slug: string | undefined){

    this.stringChange.emit(slug);
    
    // console.log("delet"+slug);
    // this.dashbordService.getByStatut(slug?slug:"all").subscribe((response:any)=>{
    //   this.tDemande = response;
    //   console.log(response);
      
    // })
    
  }
}
