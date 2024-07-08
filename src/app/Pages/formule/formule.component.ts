import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';
import Swal from 'sweetalert2';
import { GlobalConstants } from '../shared/global-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';
import { HelperService } from 'src/app/Services/helper.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DemandeurService } from 'src/app/Services/demandeur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.css']
})
export class FormuleComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  loginForm:any = FormGroup;
  responseMessage:any;
  demandeur: Demandeur = {}
  isComplete: any = false
  private jwtHelper: JwtHelperService = new JwtHelperService();
  

  nin!:string;
  hide: any;
  inValidLogin = false;
  
  //authResponse : AuthenticatorResponse = {};
 
  constructor(private formBuilder:FormBuilder, private router:Router,private utilisateurService:UtilisateurService,
               private snackbarService:SnackbarService,private route : ActivatedRoute,
                private spinner: NgxSpinnerService, private authService: AuthService,
                private helperService: HelperService, private demandeurService: DemandeurService) {}

    openSpinner(){
      this.spinner.show();
      setTimeout(()=>{
        this.spinner.hide();
      },7000)
    }


  ngOnInit(): void {

    //console.log("tester");
    
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
   
    if (signUpButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
    }

    if (signInButton && container) {
      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
      
    }
    

    this.loginForm = this.formBuilder.group({
      email:[null , Validators.required , Validators.pattern(GlobalConstants.emailRegex)],
      password:[null , Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    })
    
     
  
  }


  handleSubmit(){
   // alert("ok")
   var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password,  

    }
    this.utilisateurService.logIn(data).subscribe({
      next:(data)=>{
        console.log(data.token);
        localStorage.setItem("token", data.token as string)
        
        let t =this.jwtHelper.decodeToken(data.token as string)
        localStorage.setItem("userId", t.userId)
        localStorage.setItem("nin", t.nin)
        localStorage.setItem("profile", t.profile)
        this.utilisateurService.isLoaging = true;
        console.log(t.profile);
        if (t.profile=="user") {
          this.getDemandeurByNin(t.nin)
          
          this.router.navigate(['/demandeur']); 
        }
       if (t.profile=="admin") {
        this.router.navigate(['/dash/list_demandes']) 
       } 
        
        
      },
      error: (error)=>{
          if(error.error?.message){
              this.responseMessage = error.error?.message;
              Swal.fire({
                icon: "error",
                text: "Erreur de!",
                footer: '<a routerLing="/login">Veillez verifier vos identifiants et reéssayer votre connexion</a>'
              });
            }else{
              this.responseMessage = GlobalConstants.genericError;
            }
      }
    }
    )
  }


  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    localStorage.removeItem('nin');
    this.router.navigate(['/formule']);
    this.utilisateurService.isLoaging = false;
  }

  handlePassword(){
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }
    this.utilisateurService.forgotPassword(data).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Un mail vous a été envoyé vous avez 15 mn avant que le token exoire ! ",
          showConfirmButton: false,
          timer: 9000
        }).then(() => {
          this.router.navigate(['/accueil']);
          
        });
        
      }
    })
    
    /*this.utilisateurService.forgotPassword(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Un mail vous a été envoyé ! ",
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        this.router.navigate(['/password']);
        
      });
    },(error: { error: { message: any; }; })=>{
       if(error.error?.message){
        this.responseMessage = error.error?.message;
        this.responseMessage = error.error?.message;
        Swal.fire({
          text: "Erreur!",
          footer: '<a routerLing="/login">Email introuvable !</a>'
        });
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
       this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    })*/
 }

 refreshPage() {
  window.location.reload();
}

getbutton(){
  
}

getDemandeurByNin(nin: string){
  this.demandeurService.getDemandeurByNin(nin).subscribe({
    next:(data)=>{
      if(data.completed){
        this.router.navigate(['/espaceClient'])
      }
    }
  })
}



}


function next(value: Object): void {
  throw new Error('Function not implemented.');
}

