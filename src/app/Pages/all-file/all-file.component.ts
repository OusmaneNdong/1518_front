import { Component } from '@angular/core';
import { FileService } from 'src/app/Servicess/file.service';

@Component({
  selector: 'app-all-file',
  templateUrl: './all-file.component.html',
  styleUrls: ['./all-file.component.css']
})
export class AllFileComponent {

  files: any = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles().subscribe(
      (response: any[]) => {
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.data;
          this.files.push(element);
        });
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }

  // downloadFile(fileId: number): void {
  //   this.fileService.downloadFile(fileId).subscribe(response => {
  //     const fileNameFromUrl = "file";
  //     if (fileNameFromUrl) {
  //       const contentType = response.headers.get("Content-Type");
  //       const blob = new Blob([response.body], { type: contentType });

  //       const link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = fileNameFromUrl;

  //       link.click();

  //       window.URL.revokeObjectURL(link.href);
  //       link.remove();
  //     } else{
  //       console.log("Unable to extract file")
  //     }
  //   })
  // }
  downloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe({
      next: (response) => {
        const fileNameFromUrl = "file"; // Modify this to extract the actual filename if necessary
        if (fileNameFromUrl) {
          const contentType = response.headers.get("Content-Type") || 'application/octet-stream';
          const body = response.body;
  
          if (body) {
            const blob = new Blob([body], { type: contentType });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileNameFromUrl;
            link.click();
            window.URL.revokeObjectURL(link.href);
            link.remove();
          } else {
            console.log("Response body is null or undefined");
          }
        } else {
          console.log("Unable to extract file name");
        }
      },
      error: (err) => {
        console.error("File download failed", err);
      }
    });
  }
}
