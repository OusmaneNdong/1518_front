import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demandeur } from '../modeles/demandeur.modele';

@Injectable({
  providedIn: 'root'
})
export class DemandeurService implements OnInit{

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) {}


  ngOnInit() {

  }

  signup(data:any):Observable<number>{
    return this.httpClient.post<number>(this.url + "/api/demandeur/demander" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }
  updateDemande(data:any){
    return this.httpClient.put(this.url + "/api/demandeur/demander" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url + "/api/demandeur/forgotPassword" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }

  checkToken() {
    return this.httpClient.get(this.url + "/api/demandeur/checkToken");
  }

  uploadFile(file: File, id: number ){
    const imageFormData = new FormData()
    imageFormData.append('file', file)
    const url = `${this.url + '/api/uploads'}/${id}`;
    return this.httpClient.post(url,imageFormData);
  }

 getDemandeurById(id: number){
    return this.httpClient.get(this.url + "/api/demandeur/demandeurDetails/" + id);
  }

  // getByIdDemandeur(demandeurId: number){
  //   return this.httpClient.get(this.url + "/api/demande/demandez/" + demandeurId);
  // }
  rejectedAttestation(demandeurId:number){
    return this.httpClient.get(this.url + "/api/mail/mail_rejete/" + demandeurId, {});
  }
  getDemandeurByNin(nin: string): Observable<Demandeur>{
    return this.httpClient.get<Demandeur>(this.url + "/api/demandeur/details/" + nin);
  }

  
  login(data:any){
    return this.httpClient.post(this.url + "/api/demandeur/seConnecter" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
}


changePassword(data:any){
  return this.httpClient.post(this.url + "/api/demandeur/changePassword" , data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}

getUsers(){
  return this.httpClient.get(this.url + "/api/demandeur/getDemandeur");
}

update(data:any):Observable<Number>{
  return this.httpClient.put<Number>(this.url + "/api/demandeur/update" ,data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}

getEmail(email: string) {
  return this.httpClient.get( this.url + "/api/demandeur/get/" + email);
}

updateDataWithNin(nin: string, updatedData: any) {
  return this.httpClient.put(this.url +"/updateData", updatedData);
}

  }

