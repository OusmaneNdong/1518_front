import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';
import { DemandeurService } from 'src/app/Services/demandeur.service';
import { HelperService } from 'src/app/Services/helper.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { UtilisateurService } from 'src/app/Services/utilisateur.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router,private utilisateurService:UtilisateurService,
    private snackbarService:SnackbarService,private route : ActivatedRoute,
     private spinner: NgxSpinnerService, private authService: AuthService,
     private helperService: HelperService, private demandeurService: DemandeurService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  handlePassword(){
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }
    this.utilisateurService.forgotPassword(data).subscribe({
      next:(data)=>{
        console.log(data);
        
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


  

}
