import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
// import jwt_decode from "jwt-decode";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AutheGuardService {

  constructor( private router: Router, private authService: AuthService) { }

  canActivate(router:ActivatedRouteSnapshot):boolean{
    let expectRoleArray = router.data;
    expectRoleArray = expectRoleArray['expectedRole'];

    const token:any = localStorage.getItem('token');

    var tokenPayload:any;

    try{
      tokenPayload = jwt_decode(token);
    }catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let expectedRole = '';

    for(let i = 0 ;  i < expectRoleArray['length']; i++){
      if(expectRoleArray[i] == tokenPayload.role){
        expectedRole = tokenPayload.role;
      }
    }


    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
      if(this.authService.isAuthenticated() && tokenPayload.role == expectedRole){
        return true;
      }
      //  this.snackbarService.openSnackBar(GlobalConstants.unauthroized , GlobalConstants.error);
      this.router.navigate(['/dash/list_demandeur']);
      return false;
    }
    else{
      this.router.navigate(['/']);  
      localStorage.clear();
      return false;
    }
  }
}
