import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/modeles/user.modele';

interface User {
  userName: string;
  displayPicture: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  userName!: string;
  selectedFile!:File;

  userList: User[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUserList();  }


  private getUserList() {
    this.httpClient.get<User[]>("http://localhost:8080/user").subscribe(response => {
      this.userList = response;
    }, error => {
      console.log("error occured while fetching user list");
    });
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
  }

  save():void{
 
    const formData=new FormData();
    formData.append("name",this.userName);
    formData.append("file",this.selectedFile);
    
     this.httpClient.post("http://localhost:8080/user",formData).subscribe(response=>{
       console.log(response);
       this.getUserList();
     },error=>{
       console.log(error);
     });
     console.log("saved");
    }

}
