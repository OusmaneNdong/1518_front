import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Servicess/auth.service';
import { HelperService } from 'src/app/Servicess/helper.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';
import { data } from 'jquery';

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
  
 
  constructor(private formBuilder:FormBuilder, private router:Router,private utilisateurService:UtilisateurService,
               private route : ActivatedRoute,
                private spinner: NgxSpinnerService, private authService: AuthService,
                private helperService: HelperService, private demandeurService: DemandeurService) {}

    openSpinner(){
      this.spinner.show();
      setTimeout(()=>{
        this.spinner.hide();
      },1000)
    }


  ngOnInit(): void {

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

      this.getDemandeurByNin(localStorage.getItem("nin") as string);
      
    }
    

    this.loginForm = this.formBuilder.group({
      email:[null , Validators.required],
      password:[null , Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required,]]
    })
  }


  handleSubmit(){
   var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password,  
    }
    this.utilisateurService.logIn(data).subscribe({
      next:(data)=>{
        console.log(data.token);
        localStorage.setItem("token", data.token as string)
        this.utilisateurService.saveToken(data.token as string);
        
        let t =this.jwtHelper.decodeToken(data.token as string)
        localStorage.setItem("userId", t.userId)
        localStorage.setItem("nin", t.nin)
        localStorage.setItem("profile", t.profile)
        this.utilisateurService.isLoaging = true;
        console.log(t.profile);
        if (t.profile=="user") {
          this.getDemandeurByNin(t.nin)
        }
       if (t.profile=="admin") {
        this.router.navigate(['/dash/list_demandes']);

        } 
      },
      error: (error:any)=>{
        console.log(error);
        
          if(error.error?.errorMessage === "Your email and / or password is incorrect"){
              // this.responseMessage = error.error?.message;
              Swal.fire({
                position: "center",
                icon: "error",
                title: "email ou mot de passe inccorrect. </br> Veuillez vous inscrire si vous n'avez de compte.",
               showConfirmButton: false,
               timer: 6000
              })
              // .then(()=>{
              //   window.location.reload();
              // });
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
    this.router.navigate(['/connecter']);
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
          title: "Un mail vous a été envoyé vous avez 15 mn avant que le token expire ! ",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['/connecter']);
          
        });
        
      }
    })

 }

 refreshPage() {
  window.location.reload();
}


getDemandeurByNin(nin: string){
  this.demandeurService.getDemandeurByNin(nin).subscribe({
    next:(data)=>{
        this.router.navigate(['/espaceClient',data.id]);
    },
    error:(err:any)=>{
      if (err.error.errorMessage==="NOT_FOUND") {
        this.router.navigate(['/demandeur']);
      }
      }

  })
}
}



