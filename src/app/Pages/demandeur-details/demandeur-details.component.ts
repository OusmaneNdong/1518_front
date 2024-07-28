import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DemandService } from 'src/app/Servicess/demand.service';
import { DemandeurService } from 'src/app/Servicess/demandeur.service';
import { FileUploadService } from 'src/app/Servicess/file-upload.service';
import { HelperService } from 'src/app/Servicess/helper.service';
import { UploadService } from 'src/app/Servicess/upload.service';
import { UtilisateurService } from 'src/app/Servicess/utilisateur.service';
import { FileDetails } from 'src/app/file-details.model';
import { Demande } from 'src/app/modeles/demande.modele';
import { Demandeur } from "src/app/modeles/demandeur.modele";
import { Structure } from 'src/app/modeles/structure';
import { Upload } from 'src/app/modeles/upload';
import { Utilisateur } from 'src/app/modeles/utilisateur.modele';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandeur-details',
  templateUrl: './demandeur-details.component.html',
  styleUrls: ['./demandeur-details.component.css']
})
export class DemandeurDetailsComponent implements OnInit{

  userName!: string;
  selectedFile!:File;

  userList: Upload[] = [];
  imageId: Upload  = {
    id: 0,
    userName: '',
    displayPicture: ''
  };


  file!: File;
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  imageUrl!: string;

  id!: number;
  email!: string;
  demande: Demande  = {};
  structure: Structure = {};
  demandeur:  Demandeur = {};
  validate: boolean = false;
   utilisateur: Utilisateur = {};
  nin!: string;
  demandeurId!: number;
  utilisateurId!: number;
  apiurl: string = environment.apiUrl
  

  constructor(private  demandeurService: DemandeurService,private route: ActivatedRoute, private demandeService: DemandService,
                  private router:Router, private helperService: HelperService,private spinner:NgxSpinnerService,private uploadeSerivce: UploadService,
                  private utilisateurService: UtilisateurService,private fileUploadService: FileUploadService,private httpClient: HttpClient){}

                  openSpinner(){
                    this.spinner.show();
                    setTimeout(()=>{
                      this.spinner.hide();
                    },1000)
                  }
  

  ngOnInit(): void {

    const id = Number(this.route.snapshot.params['id']);
    this.utilisateurId = Number(localStorage.getItem("userId"));
    this.getDemande(id);
    this.getUserList();
    this.getById(id);
  }

  getDemande(id:number){
    this.demandeService.getDemanderById(id).subscribe({
       next:(data)=>{
         this.demande = data;
         
       }
     })
   }


  private getUserList() {
    this.httpClient.get<Upload[]>("http://localhost:8080/user").subscribe(response => {
      this.userList = response;
    }, error => {
      console.log("error occured while fetching user list");
    });
  }


  private getById(id: number) {
    this.httpClient.get<Upload>('http://localhost:8080/user/'+ id).subscribe(response => {
      this.imageId = response;
    }, error => {
      console.log("error occured while fetching user list");
    });
  }
   

  approuvedAttestaion() {
    this.demandeService.approuvedAttestation(this.utilisateurId, this.demande.demandeurDTO.id, Number(this.demande.id)).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Attestation envoyee au demandeur",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
        this.router.navigate(['/dash/list_demandes']);  
        })
      },
      error:(err:any)=>{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Une erreur s'est produite",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
        this.router.navigate(['/verification',this.demande.id]);        
        })
          
      }
     })
   
 
  }

   rejectedAttestation(){
    this.demandeService.rejectedAttestation(Number(this.demande.id)).subscribe({
      next:(data)=>{
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Demande Rejetée",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
      this.router.navigate(['/verification',this.demande.id]);  
            
      })
       
      },
      error:(err:any)=>{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Une erreur s'est produite",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
        this.router.navigate(['/verification',this.demande.id]);        
        })

        
      }
    })
   }


   RetourToListDemandes(){
    this.router.navigate(['/dash/list_demandes']);
   }


   selectFile(event: any) {
    this.file = event.target.files.item(0);
  }

  uploadFile() {
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
