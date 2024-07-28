import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/Servicess/helper.service';
import { Demandeur } from 'src/app/modeles/demandeur.modele';
import { event } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from 'src/app/modeles/utilisateur.modele';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { FileDetails } from 'src/app/file-details.model';
import { FileUploadService } from 'src/app/Servicess/file-upload.service';

interface User {
  userName: string;
  displayPicture: string;
}

@Component({
  selector: 'app-demandeur',
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.css'],
})



export class DemandeurComponent implements OnInit{

  userName!: string;
  selectedFile!:File;

  userList: User[] = [];


  file!: File;
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  private helper = new JwtHelperService();

  filechier!: File; 

  token!:string;
  utilisateur : Utilisateur  = {};
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
  firstName?: string;
  lastName?: string;
  constructor(
    private formBuilder:FormBuilder, private router:Router, private httpClient: HttpClient,private fileUploadService: FileUploadService,
      private demandeurService:DemandeurService,private utilisateurService: UtilisateurService,
      private route:ActivatedRoute,private spinner:NgxSpinnerService, private helperService: HelperService) {}

    openSpinner(){
      this.spinner.show();
      setTimeout(()=>{
        this.spinner.hide();
      },500)
    }
    


  ngOnInit(): void {
    const nin = this.route.snapshot.params['nin'];
    console.log("getNin()", localStorage.getItem("nin"));
    console.log(this.completedDemandeur);
    
    this.nin = this.getNin();
    this.getutilisateurbynin(localStorage.getItem("nin") as string);
    this.demandeurForm = this.formBuilder.group({
      telephone:[null , Validators.required],
      datedenaissance:[null , [Validators.required]],
      lieudenaissance:[null, [Validators.required]],
      nin:[this.utilisateur.nin],
      prenom:[this.utilisateur.prenom],
      nom:[this.utilisateur.nom],
      scannernin:[null, [Validators.required]],
      adresse:[null , [Validators.required]],
      sexe:[null , [Validators.required]],
      fonction:[null , [Validators.required]]
    })
   

    console.log("helper nin " + this.helperService.nin);
    
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    console.log(event.target.files[0]);
    
  }


  save():void{
 
    const formData=new FormData();
    formData.append("name",this.userName);
    formData.append("file",this.selectedFile);
    
     this.httpClient.post("http://localhost:8080/user",formData).subscribe(response=>{
       console.log(response);
      //  this.getUserList();
     },error=>{
       console.log(error);
     });
     console.log("saved");
    }
    // end upload imp

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
  getutilisateurbynin(nin:string){
    this.utilisateurService.getByNin(nin).subscribe({
      next:(data)=>{
        this.utilisateur = data;
        this.firstName = this.utilisateur.prenom;
        this.lastName = this.utilisateur.nom;
        console.log("firstName" + " " + this.firstName);
        console.log("lastName" + " " + this.lastName);
        
        
        console.log("utilisateur data are : " + " " + this.utilisateur.prenom);
        
      }
    })
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


  handleSubmit(){
    //alert("ok")
    var formDate = this.demandeurForm.value;
    var data = {
      datedenaissance:formDate.datedenaissance,
      lieudenaissance: formDate.lieudenaissance,
      nin:this.helperService.nin,
     scannernin: formDate.scannernin,
      telephone: formDate.telephone,
      adresse: formDate.adresse,
      sexe: formDate.sexe,
      fonction: formDate.fonction
      
    }
    console.log(data);
    this.demandeurService.signup(data).subscribe({
      next:(data)=>{
        this.demandeurService.uploadImage(this.selectedFile, data).subscribe({
          next:(data)=>{
            console.log("ok +"+data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Bravo Votre Profile est complet.",
              showConfirmButton: true,
              timer: 1000
            }).then(()=>{
              this.router.navigate(['/espaceClient',data])
            })
          } ,
          error:(err:any)=>{
            console.log("error "+ err.errorMessage);
            
          }
        })
        localStorage.setItem('nin', this.getNin());
        localStorage.getItem('prenom');
        localStorage.getItem('nom');
      },
      error:(err:any)=>{
        if (err.error.errorMessage==='NOT_FOUND') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "not found ",
            showConfirmButton: false,
            timer: 1000
          })
        }
        if (err.error.errorMessage==='INVALID_EXTENTION') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "erreur extension, veuillez choisir un fichier d'extension jpg,jpeg,png ou pdf ",
            showConfirmButton: false,
            timer: 1000
          })
        }
        
      }
      
      
    })

  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      this.filechier = event.target.files[0];
      
      const maxSize = 2 * 1024 * 1024 * 1024;
  
      if (
        this.filechier.type == 'image/png' ||
        this.filechier.type == 'image/jpeg' ||
        this.filechier.type == 'image/jpg' ||
        this.filechier.type == 'application/pdf'
      ) {
        if (this.filechier.size <= maxSize) {
          const formData = new FormData();
          formData.append('filechier', this.filechier);
          this.httpClient.post('http://localhost:8080/api/upload', formData).subscribe((res: any) => {
            debugger;
          });
        } else {
          event.target.value = null;
          alert('la taille du fichier ne doit pas dépasser 2GB');
        }
      } else {
        event.target.value = null;
        alert("choisir un fichier de format jpeg,jpg,png,pdf"); 
        window.location.reload();
      }
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

    

  selectFile(event: any) {
    this.file = event.target.files.item(0);
  }

  uploadFiles() {
    this.fileUploadService.upload(this.file).subscribe({
      next: (data) => {
        this.fileDetails = data;
        this.fileUris.push(this.fileDetails.fileUri);
        alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    });
  }




}
