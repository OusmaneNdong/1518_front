import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilisateurService } from '../../Servicess/utilisateur.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/Servicess/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit{

  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1000)
  }

  setPasswordForm:any = FormGroup;
  responseMessage:any;
  
  registerSucess:boolean = false;
  isButtonVisible = true;

  constructor(private formBulider:FormBuilder, 
    private utilisateurService:UtilisateurService , 
    private router: Router,
    private spinner: NgxSpinnerService,
    private helperService: HelperService
    ) { }


  ngOnInit(): void {
    this.setPasswordForm = this.formBulider.group({
//      email:[this.email, Validators.required],
      oldPassword:[null , Validators.required],
      newPassword:[null , Validators.required],
      confirmPassword:[null, Validators.required]
     

    });
    
  }

  handleSubmit(){
    var formData = this.setPasswordForm.value;
    var data = {
      email:this.helperService.email,
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirm:formData.confirmPassword
      
    }
    this.utilisateurService.changePassword(data).subscribe({
      next:(data)=>{
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "mot de passe modifiée! ",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/connecter']);      });
        
      },
      error:(err:any)=>{
        console.log("erreur ="+err.error.errorMessage);
        if (err.error.errorMessage==='NOT_MATCH_PASSWORD') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Les mots de passe ne correspondent pas ",
            showConfirmButton: false,
            timer: 2000
          }) 
        }
        if (err.error.errorMessage==='NOT_MATCH_PASSWORD_OLD') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "L'ancien mot de passe saisit n'est pas correct",
            showConfirmButton: false,
            timer: 2000
          }) 
        }
      }
    })

    this.registerSucess=true; 
    this.isButtonVisible = false;  
  }

  

     checkPassword(){
    var formData = this.setPasswordForm.value;
    const nPassword = formData.newPassword;
     const confPassword = formData.confirmPassword;

     if(nPassword != confPassword){
      return "mot de passe differents";
     }
     return true;
  }
  refresh(){
    window.location.reload();
  }
  

  deconnect(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    localStorage.removeItem('nin');
    this.router.navigate(['/connecter']);
    this.refresh()
  }
  

}
