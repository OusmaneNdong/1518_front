import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private decodedToken: any;

  constructor() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem("token") as string);
   }

   get userId(){
    return this.decodedToken.userId;
   }
   get demandeurId(){
    return this.decodedToken.demandeur.id;
   }

   get nin(){
    return this.decodedToken.nin;
   }

   get email(){
    return this.decodedToken.email;
   }

   get fullName(){
    return this.decodedToken.fullName;
   }
   get profile(){
    return this.decodedToken.profile;
   }
   get status(){
    return this.decodedToken.status;
   }

   get idDemandeur(){
    return this.decodedToken.idDemandeur;
   }

   get DemandeurPrenom(){
    return this.decodedToken.prenom;
   }
   get DemandeurNom(){
    return this.decodedToken.nom;
   }

}
