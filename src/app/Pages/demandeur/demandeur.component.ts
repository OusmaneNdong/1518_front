import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { DemandeurService } from 'src/app/Services/demandeur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/Services/helper.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';
import { event } from 'jquery';

@Component({
  selector: 'app-demandeur',
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.css'],
})



export class DemandeurComponent implements OnInit{

  private helper = new JwtHelperService();

  filechier!: File; 

  token!:string;
  demandeur: Demandeur = {};
  completedDemandeur: Demandeur = {};
  nin!:string;
  idDemandeur!:number
  password = true;
  confirmpassword = true;
  signForm:any = FormGroup;
  demandeurForm:any = FormGroup;
  responseMessage:any;
  hide: any;
  userId!: number;
  loginForm: any = FormGroup;
  file!: string;
  constructor(
    private formBuilder:FormBuilder, private router:Router,
      private demandeurService:DemandeurService,private snackbarService:SnackbarService,
      private route:ActivatedRoute,private spinner:NgxSpinnerService, private helperService: HelperService) {}

    openSpinner(){
      this.spinner.show();
      setTimeout(()=>{
        this.spinner.hide();
      },5000)
    }
    


  ngOnInit(): void {
    console.log("getNin()", localStorage.getItem("nin"));
    console.log(this.completedDemandeur);
    
    this.nin = this.getNin();
    this.demandeurForm = this.formBuilder.group({
      telephone:[null , Validators.required],
      datedenaissance:[null , [Validators.required]],
      lieudenaissance:[null, [Validators.required]],
      nin:[this.helperService.nin , Validators.required],
      scannernin:[null, [Validators.required]],
      adresse:[null , [Validators.required]],
      sexe:[null , [Validators.required]],
      fonction:[null , [Validators.required]]

    })
  }

  uploadFile(file: File){
    this.demandeurService.uploadFile(file,1).subscribe({
      next:(response)=>{
        this.demandeur = response;
  
      }
    })
  }
  getIdDemandeur(){
    return this.helperService.idDemandeur();
  }

  getNin(){
    if( localStorage.getItem("token")?.lastIndexOf != null){
      const decodedToken = this.helper.decodeToken(localStorage.getItem("token") as string);
      this.nin = decodedToken.nin;
    }
    return this.nin;
  }

  validateSubmit(){
    if(this.demandeurForm.controls['nin'].value  =! this.signForm.controls['nin'].value){
      console.log("true" + this.signForm.controls);
      return true;
    }else{
      console.log("false" + this.signForm.controls);
      return false;
    }
  }

  validationRegister(){
    if(this.demandeurForm.controls['telephone'] !== null && this.demandeurForm.controls['datedenaissance'] !== null 
      && this.demandeurForm.controls['nin'] !== null && this.demandeurForm.controls['scannernin'] !== null &&
      this.demandeurForm.controls['telephone'] !== null && this.demandeurForm.controls['adresse'] !== null &&
      this.demandeurForm.controls['sexe'] !== null && this.demandeurForm.controls['foction'] !== null){
        this.router.navigate(['/espaceClient']);
      }
  }

  handleSubmit(){
    var formDate = this.demandeurForm.value;
    var data = {
      datedenaissance:formDate.datedenaissance,
      lieudenaissance: formDate.lieudenaissance,
      nin:this.helperService.nin,
      // userId:this.helperService.userId,
      scannernin: formDate.scannernin,
      telephone: formDate.telephone,
      adresse: formDate.adresse,
      sexe: formDate.sexe,
      fonction: formDate.fonction,
      
    }
    console.log(data);
    this.demandeurService.signup(data).subscribe({
      next:(data)=>{
        this.demandeurService.uploadFile(this.filechier, data).subscribe({
          next:(data)=>{
            console.log("ok +"+data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Bravo Votre Profile est complet.",
              showConfirmButton: true,
              timer: 5000
            }).then(()=>{
              this.router.navigate(['/espaceClient']);
            })
            
          }
        })
        localStorage.setItem('nin', this.getNin());
        //  this.responseMessage = data;
        //  this.snackbarService.openSnackBar(this.responseMessage,"");
        //  this.router.navigate(['/espaceClient']);
      },
      error:(err:any)=>{
        if (err.error.errorMessage==='NOT_FOUND') {
          alert("not found")
          Swal.fire({
            position: "center",
            icon: "error",
            title: "not found ",
            showConfirmButton: false,
            timer: 5000
          })
        }
      }
    })
    /*this.demandeurService.signup(data).subscribe((response:any)=>{
      console.log(response);
      (response)
      this.demandeurService.uploadFile(this.filechier, response).subscribe({
        next:(data)=>{
          console.log("ok +"+response);
          
        }
      })
      localStorage.setItem('nin', this.getNin());
       this.responseMessage = response?.message;
       this.snackbarService.openSnackBar(this.responseMessage,"");
       this.router.navigate(['/espaceClient']);
    },(error: { error: { message: any; }; })=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      alert(this.responseMessage + " " + GlobalConstants.error);
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    })*/
  }

  onImageUpload(event: any){
    if(event.target.files.length > 0  ){
      this.filechier = event.target.files[0];
    }
    
  }


  registerByRetrieve(): void {
    const formDate = this.demandeurForm.value;
  
    this.demandeurService.getEmail(formDate.email).subscribe(
      (response: any) => {
        const nin = response.nin;
  
        const updatedData = {
          datedenaissance: formDate.datedenaissance,
          lieudenaissance: formDate.lieudenaissance,
          telephone: formDate.telephone,
          scannernin: formDate.scannernin,
          adresse: formDate.adresse,
          sexe: formDate.sexe,
          fonction: formDate.fonction,

        };
  
        this.updateDataWithNin(nin, updatedData);
      },
      (error) => {
        console.error('Erreur de recuperation des données', error);
      }
    );
  }
  
  updateDataWithNin(nin: string, updatedData: any): void {
    this.demandeurService.updateDataWithNin(nin, updatedData).subscribe(
      (response: any) => {
        console.log('Data updated successfully:', response);
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
  }

    




}
