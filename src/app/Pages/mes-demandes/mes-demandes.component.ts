import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import saveAs from 'file-saver';
import { DemandService } from 'src/app/Servicess/demand.service';
import { Demande } from 'src/app/modeles/demande.modele';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {

  demande!: any;
  id!: number;
  statut: any;
  mesDemande : Demande[] = [];


  demandes: Demande [] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];


  constructor(private router : Router, private route: ActivatedRoute, private ds : DemandService){}

   ngOnInit(): void {
    console.log(
      this.route.snapshot.params['id']);
   this.getMesdemandes(Number(this.route.snapshot.params['id']));
   this.listeDemande();
  }

  getMesdemandes(id:number){
    this.ds.mesDemandes(id).subscribe({
      next:(data)=>{
      this.mesDemande = data;
      console.log(this.mesDemande);
      
      }
    })
  }

  listeDemande(){
    this.ds.getAllDemandes().subscribe({
      next:(data)=>{
          this.demandes = data;
          console.log(data);
          
      }
    })
  }

  load(urlattestation: string | undefined){
    this.ds.downloadDemande(urlattestation as string).subscribe(
      event=>{
         
          console.log(event);
          this.resportProgress(event);
      }
    )
    //this.router.navigate([])
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
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: ⁠ ${httpEvent.headers.get('Content-Type')};charset=utf-8 ⁠}),
          //    httpEvent.headers.get('File-Name'));
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
