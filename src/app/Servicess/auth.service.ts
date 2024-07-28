import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { data,} from 'jquery';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../modeles/user.modele';
import { Utilisateur } from '../modeles/utilisateur.modele';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;


  constructor(private router:Router, private httpClient:HttpClient) { }


  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');
       if(!token){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }

}