import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../modeles/demande.modele';

@Injectable({
  providedIn: 'root'
})
export class DashbordService{

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getCount():Observable<number>{
    return this.httpClient.get<number>(this.url+"/api/dashbord/total");
  }
  getApprouved():Observable<number>{
    return this.httpClient.get<number>(this.url+"/api/dashbord/total-approuvees");
  }
  getRejeted():Observable<number>{
    return this.httpClient.get<number>(this.url+"/api/dashbord/total-rejetees");
  }
  getCours():Observable<number>{
    return this.httpClient.get<number>(this.url+"/api/dashbord/total-cours");
  }

  getDemandeCount():Observable<Demande>{
    return this.httpClient.get<Demande>(this.url+"/api/dashbord/demande/total");
  }
  getDemandeApprouved():Observable<Demande>{
    return this.httpClient.get<Demande>(this.url+"/api/dashbord/demande/total-approuvees");
  }
  getDemandeRejeted():Observable<Demande>{
    return this.httpClient.get<Demande>(this.url+"/api/dashbord/demande/total-rejetees");
  }
  getDemandeCours():Observable<Demande>{
    return this.httpClient.get<Demande>(this.url+"/api/dashbord/demande/total-cours");
  }

  getByStatut(statut: string):Observable<Demande>{
    return this.httpClient.get<Demande>(this.url + "/api/demande/getStatut/" + statut);
  }
}
