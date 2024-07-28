import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/Servicess/helper.service';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent  implements OnInit{



  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },4000)
  }

  PasswordForm:any = FormGroup;
  responseMessage:any;
  
  registerSucess:boolean = false;
  isButtonVisible = true;
  token: string = "";

  constructor(private formBulider:FormBuilder, private utilisateurService:UtilisateurService, 
   private router: Router,
    private spinner: NgxSpinnerService,private helperService: HelperService, private activateRoute: ActivatedRoute
    ) { }


  ngOnInit(): void {
    console.log("log "+this.activateRoute.snapshot.params['token']);
    this.token = this.activateRoute.snapshot.params['token'];
    
    this.PasswordForm = this.formBulider.group({
      // email:[null, Validators.required],
      newPassword:[null , Validators.required],
      confirmPassword:[null, Validators.required]
  
    });
  }



  handleSubmit(){
    var formData = this.PasswordForm.value;
    var data = {
      token:this.token,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword      
    }
console.log(data);

     this.utilisateurService.resetpassword(data).subscribe({
      next:(data)=>{
        console.log("success");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "mot de passe réinitialisé avec success! ",
          showConfirmButton: false,
          timer: 5000
        }).then(() => {
          this.router.navigate(['/connecter']);      });
        
      },
      error:(err:any)=>{
        console.log("error "+err.error.errorMessage);
        if (err.error.errorMessage==='NOT_MATCH_PASSWORD') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "mot de passes non confromes.",
            showConfirmButton: false,
            timer: 3000
          })
          
        }
        if (err.error.errorMessage==='TOKEN_EXPIRED') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Token expiré! ",
            showConfirmButton: false,
            timer: 3000
          })
          
        }
        if (err.error.errorMessage==='TOKEN_INVALID') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Token invalide! ",
            showConfirmButton: false,
            timer: 3000
          })
        }   
      }
     })
  }



}
