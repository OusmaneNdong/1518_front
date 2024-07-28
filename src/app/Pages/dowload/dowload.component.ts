import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandService } from 'src/app/Servicess/demand.service';
import { saveAs } from 'file-saver';
import { Demande } from 'src/app/modeles/demande.modele';

@Component({
  selector: 'app-dowload',
  templateUrl: './dowload.component.html',
  styleUrls: ['./dowload.component.css']
})
export class DowloadComponent implements OnInit{

  demandes: Demande [] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];

  constructor(private demandeService: DemandService, private router:Router){}


  ngOnInit(): void {
    this.listeDemande();
  }

  listeDemande(){
    this.demandeService.getAllDemandes().subscribe({
      next:(data)=>{
          this.demandes = data;
          console.log(data);
          
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
    //this.router.navigate([])
  }
  // load(s: string | undefined){
  //   console.log("ok +"+s);
    
  // }
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


  


