import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../modeles/utilisateur.modele';
import { Router } from '@angular/router';
import { Demandeur } from '../modeles/demandeur.modele';
import { AuthenticationResponse } from '../modeles/authentication-response';
import { HelperService } from './helper.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  url = environment.apiUrl;
  http: any;
  baseUrl: any;


email!:string;
password!:string;
isValid:boolean = false;
errorMessage: any;
isLoaging = false;
fullName!: string;
token!:string;
private helper = new JwtHelperService();

  constructor(private httpClient:HttpClient, private router: Router) {}


  signUp(data:any){
    return this.httpClient.post(this.url + "/api/utilisateur/register" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }

  forgotPassword(data:any):Observable<number>{
    return this.httpClient.post<number>(this.url + "/api/utilisateur/password-reset-request", data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }
  getById(id: number){
    return this.httpClient.get(this.url + "/api/utilisateur/utilisateurDetails/" + id,{
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    });
  }
  getByNin(nin: string):Observable<Utilisateur>{
    return this.httpClient.get<Utilisateur>(this.url + "/api/utilisateur/nin/" + nin,{
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + "/api/utilisateur/checkToken");
  }

logIn(data:any):Observable<AuthenticationResponse>{
  return this.httpClient.post<AuthenticationResponse>(this.url + "/api/utilisateur/authentication" , data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}

saveToken(token: string){
  
  this.token=token;
  this.isLoaging = true;
  this.decodedJwt()
}
decodedJwt(){
  
  const decodedToken = this.helper.decodeToken(this.token);
  this.fullName = decodedToken.fullName;
}


changePassword(data:any):Observable<number>{
  return this.httpClient.post<number>(this.url + "/api/utilisateur/change-password" , data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}
  resetpassword(data:any):Observable<string>{
    return this.httpClient.post<string>(this.url+"/api/utilisateur/reset-password", data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  setPassword(data:any){
    return this.httpClient.post(this.url + "/api/utilisateur/set-password" , data , {
      headers:new HttpHeaders().set('Content-Type' , 'application/json')
    })
  }




getUtilisateur(){
  return this.httpClient.get(this.url + "/api/utilisateur/getUtilisateur");
}
getUtilisateurId(id: number){
  return this.httpClient.get(this.url + "/api/utilisateur/utilisateurDetails/" + id);
}

getUtilisateurStatus(status: string){
  return this.httpClient.get(this.url + "api/utilisateur/statut/Cours/" + status);
}

update(data:any){
  return this.httpClient.post(this.url + "/api/utilisateur/update" , data , {
    headers:new HttpHeaders().set('Content-Type' , 'application/json')
  })
}


}
